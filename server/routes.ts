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

    // Loop to handle up to 5 iterative function call passes from the LLM
    for (let iter = 0; iter < 5; iter++) {
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
          const result = handler ? handler() : { error: `Tool ${name} is not implemented.` };

          // ✨ THE COMPATIBILITY SOLVER:
          // The SDK requires a pure key-value object block for the tool response.
          // If the tool returns a primitive or a raw array (like list of skills/projects),
          // it MUST be cleanly mapped into an explicit object property.
          let structuredOutput: Record<string, any> = {};

          if (Array.isArray(result)) {
            // Converts raw array results into an object wrapper, e.g., { skills: [...] }
            const keyName = name.toLowerCase().replace('get', '');
            structuredOutput[keyName || 'data'] = result;
          } else if (typeof result === 'object' && result !== null) {
            structuredOutput = { ...result };
          } else {
            structuredOutput = { result };
          }

          // In the modern SDK, pass the pure structured object directly to the response block
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

        // Continue loop to feed answers back to model
      } else {
        // No more function calls, we have the final text generation!
        break;
      }
    }

    // Stream the final generated answer to the client using Server-Sent Events
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

  } catch (error: any) {
    console.error('Error in RAG routing endpoint:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: error.message || 'Internal server error' });
    }
  }
});