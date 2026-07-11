import express from 'express';
import { ai } from './ai.js';
import { SYSTEM_INSTRUCTION } from './prompt.js';
import { toolHandlers, ALL_TOOLS } from './rag.js';

export const apiRouter = express.Router();

apiRouter.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: 'Missing or invalid messages array' });
      return;
    }

    // Guard API key presence
    if (!process.env.GEMINI_API_KEY) {
      console.error('Missing GEMINI_API_KEY secret.');
      res.status(500).json({ error: 'Gemini API key is not configured' });
      return;
    }

    // Structure conversation history for Gemini's API layout
    const contents: any[] = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    let quotaExceeded = false;

    // Loop to handle up to 5 iterative function call passes from the LLM
    for (let iter = 0; iter < 5; iter++) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.5-flash',
          contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.3,
            tools: ALL_TOOLS,
          }
        });

        const functionCalls = response.functionCalls;

        if (functionCalls && functionCalls.length > 0) {
          console.log(`[RAG-Tool] Gemini invoked:`, functionCalls.map(f => f.name));

          // 1. Add model's request containing function calls directly to content history
          const modelContent = response.candidates?.[0]?.content;
          if (modelContent) {
            contents.push(modelContent);
          } else {
            contents.push({
              role: 'model',
              parts: functionCalls.map(f => ({ functionCall: f }))
            });
          }

          // 2. Perform local data extraction and form standard key-value responses
          const responseParts = [];
          for (const call of functionCalls) {
            const name = call.name;
            const handler = name ? toolHandlers[name] : undefined;
            
            // Resolve the tool execution cleanly
            const result = handler ? await handler() : { error: `Tool ${name} is not implemented.` };

            console.log(`[RAG-Tool-Result] Data payload retrieved for ${name}:`, result);

            // Since all handlers now consistently return envelope objects, pass them through or fall back defensively
            const structuredOutput = typeof result === 'object' && result !== null ? result : { result };

            responseParts.push({
              functionResponse: {
                name: call.name,
                response: structuredOutput
              }
            });
          }

          // 3. Append the execution output with role 'user'
          contents.push({
            role: 'user',
            parts: responseParts
          });

        } else {
          break;
        }
      } catch (innerError: any) {
        if (innerError.status === 429) {
          quotaExceeded = true;
          break; // Break the function loop cleanly
        }
        throw innerError;
      }
    }

    // 🛑 If a quota error was hit during the loop OR downstream, immediately return the fallback message
    if (quotaExceeded) {
      console.warn("⚠️ Gemini Quota exceeded! Serving layout fallback message.");
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end("Hi there! I am Nsambu Laurenta's custom AI portfolio assistant. It looks like my live background API integration has hit its free tier usage threshold for the moment, but my local components are working perfectly. Feel free to explore the interactive technical sections above to learn more about my background in Data Science, AI engineering, and full-stack applications!");
      return;
    }

    // Stream the final generated answer to the client using Server-Sent Events
    try {
      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-3.5-flash',
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.4,
          tools: ALL_TOOLS,
        }
      });

      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Transfer-Encoding', 'chunked');

      for await (const chunk of responseStream) {
        if (chunk.text) {
          res.write(chunk.text);
        }
      }

      res.end();
    } catch (streamError: any) {
      if (streamError.status === 429) {
        console.warn("⚠️ Gemini Quota exceeded during response streaming! Activating fallback message.");
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end("Hi there! I am Nsambu Laurenta's custom AI portfolio assistant. It looks like my live background API integration has hit its free tier usage threshold for the moment, but my local components are working perfectly. Feel free to explore the interactive technical sections above to learn more about my background in Data Science, AI engineering, and full-stack applications!");
        return;
      }
      throw streamError;
    }

  } catch (error: any) {
    console.error('Error in RAG routing endpoint:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: error.message || 'Internal server error' });
    }
  }
});