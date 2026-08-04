import type { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService.js';
import { sendSuccess, sendError } from '../utils/response.js';

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password, role } = req.body;
      const user = await this.authService.register(email, password, role);
      sendSuccess(res, 'Пользователь успешно зарегистрирован', user, 201);
    } catch (error: any) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body;
      const result = await this.authService.login(email, password);
      sendSuccess(res, 'Вход выполнен успешно', result);
    } catch (error: any) {
      next(error);
    }
  };

  getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        sendError(res, 'Не авторизован', null, 401);
        return;
      }
      const user = await this.authService.getUserById(userId);
      if (!user) {
        sendError(res, 'Пользователь не найден', null, 404);
        return;
      }
      sendSuccess(res, 'Профиль получен', user);
    } catch (error: any) {
      next(error);
    }
  };
}
