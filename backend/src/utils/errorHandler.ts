import { Request, Response, NextFunction } from 'express';
import { errorResponse } from './response';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error('Error:', err.stack || err);

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json(errorResponse(message, null));
};