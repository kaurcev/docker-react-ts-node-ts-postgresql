import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';
import { sendSuccess, sendError } from '../utils/response';

export class AuthController {
  constructor(private authService: AuthService) {}

  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password, role } = req.body;
      const user = await this.authService.register(email, password, role);
      sendSuccess(res, 'User registered successfully', user, 201);
    } catch (error: any) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body;
      const result = await this.authService.login(email, password);
      sendSuccess(res, 'Login successful', result);
    } catch (error: any) {
      next(error);
    }
  };

  getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        sendError(res, 'Unauthorized', null, 401);
        return;
      }
      const user = await this.authService.getUserById(userId);
      if (!user) {
        sendError(res, 'User not found', null, 404);
        return;
      }
      sendSuccess(res, 'Profile fetched', user);
    } catch (error: any) {
      next(error);
    }
  };
}