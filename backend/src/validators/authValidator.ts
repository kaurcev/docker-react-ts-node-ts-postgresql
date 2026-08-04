import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Неверный формат email'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
  role: z.enum(['user', 'moderator', 'admin']).optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Неверный формат email'),
  password: z.string().min(1, 'Пароль обязателен'),
});

export const updateRoleSchema = z.object({
  role: z.enum(['user', 'moderator', 'admin'], {
    errorMap: (issue) => {
      if (issue.code === 'invalid_enum_value') {
        return { message: 'Роль должна быть: user, moderator или admin' };
      }
      return { message: 'Неверное значение роли' };
    }
  }),
});