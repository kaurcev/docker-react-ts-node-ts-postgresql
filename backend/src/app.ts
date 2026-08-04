import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './utils/errorHandler.js';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'OK' });
});

app.use(errorHandler);

export default app;
