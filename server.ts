import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { apiRouter } from './server/routes.js';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON parsing middleware
  app.use(express.json());

  // Mount backend API routes first
  app.use('/api', apiRouter);

  // Health check route
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'ai-portfolio-server' });
  });

  // Integrate Vite middleware or static serving depending on environment
  if (process.env.NODE_ENV !== 'production') {
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

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running successfully on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Fatal error booting server:', error);
  process.exit(1);
});
