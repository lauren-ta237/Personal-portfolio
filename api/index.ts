import express from 'express';
import { apiRouter } from '../server/routes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// JSON parsing middleware
app.use(express.json());

// Mount backend API routes directly onto the Vercel serverless handler base path
app.use('/api', apiRouter);

// Health check route
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'ai-portfolio-serverless' });
});

export default app;