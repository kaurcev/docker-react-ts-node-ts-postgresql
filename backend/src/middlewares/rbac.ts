import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response';

export const rbacMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as any).user;
    if (!user) {
      sendError(res, 'Не авторизован', null, 401);
      return;
    }
    if (!allowedRoles.includes(user.role)) {
      sendError(res, 'Доступ запрещен: недостаточные права', null, 403);
      return;
    }
    next();
  };
};