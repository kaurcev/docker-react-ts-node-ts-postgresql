import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import type { ZodTypeAny } from 'zod';
import { sendError } from '../utils/response.js';

export const validate = (schema: ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const messages = error.issues.map(e => `${e.path.join('.')}: ${e.message}`);
        sendError(res, 'Ошибка валидации', messages, 400);
        return;
      }
      next(error);
    }
  };
};
