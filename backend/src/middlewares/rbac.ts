import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response';

export const rbacMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as any).user;
    if (!user) {
      sendError(res, 'Unauthorized', null, 401);
      return;
    }
    if (!allowedRoles.includes(user.role)) {
      sendError(res, 'Forbidden: insufficient role', null, 403);
      return;
    }
    next();
  };
};