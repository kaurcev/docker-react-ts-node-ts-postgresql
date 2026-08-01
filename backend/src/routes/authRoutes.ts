import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { AuthService } from '../services/authService';
import { UserRepository } from '../repositories/userRepository';
import { authMiddleware } from '../middlewares/auth';
import { rbacMiddleware } from '../middlewares/rbac';
import { validate } from '../middlewares/validate';
import { registerSchema, loginSchema, updateRoleSchema } from '../validators/authValidator';
import { sendSuccess, sendError } from '../utils/response';

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
      await userRepository.updateRole(Number(id), role);
      sendSuccess(res, 'Role updated successfully', { id, role });
    } catch (error) {
      next(error);
    }
  }
);

export default router;