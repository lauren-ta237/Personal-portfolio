import express from 'express';
import { ai } from './ai.js';
import { SYSTEM_INSTRUCTION } from './prompt.js';
import { toolHandlers, ALL_TOOLS } from './rag.js';

export const apiRouter = express.Router();

// 1. Define a basic Cache structure
interface CacheEntry {
  text: string;
  expiresAt: number;
}

// In-memory key-value store (Key: deterministic hash or stringified messages array)
const queryCache = new Map<string, CacheEntry>();

// Set a Time-to-Live (TTL) of 30 minutes for cached responses
const CACHE_TTL_MS = 30 * 60 * 1000; 

// Promise-based sleep helper utility
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper function to create a unique cache key from incoming chat messages
const generateCacheKey = (messages: any[]): string => {
  return JSON.stringify(
    messages.map(m => ({ role: m.role, content: m.content?.trim().toLowerCase() }))
  );
};

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

    // 2. Check the Cache before processing anything
    const cacheKey = generateCacheKey(messages);
    const cachedItem = queryCache.get(cacheKey);

    if (cachedItem) {
      if (Date.now() < cachedItem.expiresAt) {
        console.log('[Cache-Hit] Serving answer instantly from server memory.');
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.write(cachedItem.text);
        res.end();
        return;
      } else {
        // Evict expired entries
        queryCache.delete(cacheKey);
      }
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
        // ✨ Adjusted to 500ms to stay within Vercel's Serverless timeout profile
        if (iter > 0) {
          console.log(`[RAG-Throttle] Pausing for 500ms before tool iteration pass ${iter + 1} to prevent 429 burst flags...`);
          await sleep(500);
        }

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

          const modelContent = response.candidates?.[0]?.content;
          if (modelContent) {
            contents.push(modelContent);
          } else {
            contents.push({
              role: 'model',
              parts: functionCalls.map(f => ({ functionCall: f }))
            });
          }

          const responseParts = [];
          for (const call of functionCalls) {
            const name = call.name;
            const handler = name ? toolHandlers[name] : undefined;
            
            const result = handler ? await handler() : { error: `Tool ${name} is not implemented.` };
            console.log(`[RAG-Tool-Result] Data payload retrieved for ${name}:`, result);

            const structuredOutput = typeof result === 'object' && result !== null ? result : { result };

            responseParts.push({
              functionResponse: {
                name: call.name,
                response: structuredOutput
              }
            });
          }

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
          break; 
        }
        throw innerError;
      }
    }

    if (quotaExceeded) {
      console.warn("⚠️ Gemini Quota exceeded! Serving layout fallback message.");
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end("Hi there! I am Nsambu Laurenta's custom AI portfolio assistant. It looks like my live background API integration has hit its free tier usage threshold for the moment, but my local components are working perfectly. Feel free to explore the interactive technical sections above to learn more about my background in Data Science, AI engineering, and full-stack applications!");
      return;
    }

    // Stream final generated answer and aggregate text to store inside the cache
    let completeResponseText = '';
    try {
      // ✨ Adjusted to 500ms right before starting the final extraction stream
      if (contents.length > messages.length) {
        console.log(`[RAG-Throttle] Pausing for 500ms before starting final response stream extraction...`);
        await sleep(500);
      }

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
          completeResponseText += chunk.text; // Accumulate the streaming response
          res.write(chunk.text);
        }
      }

      // 3. Save the full result to cache before ending the stream response
      if (completeResponseText.trim().length > 0) {
        queryCache.set(cacheKey, {
          text: completeResponseText,
          expiresAt: Date.now() + CACHE_TTL_MS
        });
        console.log('[Cache-Save] Successfully saved generated response to cache memory.');
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