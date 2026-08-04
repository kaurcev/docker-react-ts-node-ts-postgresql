import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';
import { AuthService } from '../services/authService.js';
import { UserRepository } from '../repositories/userRepository.js';
import { authMiddleware } from '../middlewares/auth.js';
import { rbacMiddleware } from '../middlewares/rbac.js';
import { validate } from '../middlewares/validate.js';
import { registerSchema, loginSchema, updateRoleSchema } from '../validators/authValidator.js';
import { sendSuccess } from '../utils/response.js';
import { AppError } from '../utils/customError.js';

const router = Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.get('/profile', authMiddleware, authController.getProfile);

router.put(
  '/role/:id',
  authMiddleware,
  rbacMiddleware(['admin']),
  validate(updateRoleSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { role } = req.body;
      const user = await userRepository.findById(Number(id));
      if (!user) {
        throw new AppError('Пользователь не найден', 404);
      }

      await userRepository.updateRole(Number(id), role);
      sendSuccess(res, 'Роль успешно обновлена', { id, role });
    } catch (error) {
      next(error);
    }
  }
);

export default router;