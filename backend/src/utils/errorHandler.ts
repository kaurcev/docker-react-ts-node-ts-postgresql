import type { Request, Response, NextFunction } from 'express';
import { errorResponse } from './response.js';

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction): void => {
  console.error('Error:', err.stack || err);

  const status = err.status || 500;
  const message = err.message || 'Внутренняя ошибка сервера';

  res.status(status).json(errorResponse(message, null));
};
