import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { apiRouter } from './server/routes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// JSON parsing middleware
app.use(express.json());

// Mount backend API routes first
app.use('/api', apiRouter);

// Health check route
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'ai-portfolio-server' });
});

// Initialization function for frontend static files or Dev Middleware
async function initializeFrontend() {
  // Only mount Vite Dev Middleware if we are strictly in development AND not running on Vercel
  if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    console.log('Mounting Vite dev middleware...');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    console.log('Serving production static build...');
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }
}

// Fire off frontend configuration
initializeFrontend().catch((err) => {
  console.error('Error setting up frontend layers:', err);
});

// ONLY spin up standard listeners if running locally outside of the serverless edge environment
if (!process.env.VERCEL) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running successfully on http://0.0.0.0:${PORT}`);
  });
}

// CRITICAL FOR VERCEL: Export the raw express application instance
export default app;