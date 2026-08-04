import bcrypt from 'bcrypt';
import { UserRepository, IUserRepository } from '../repositories/userRepository';
import { generateToken } from '../utils/jwt';
import { User } from '../models/user';
import { AppError } from '../utils/customError';

export class AuthService {
  constructor(private userRepository: IUserRepository) {}

  async register(email: string, password: string, role?: string): Promise<Omit<User, 'password_hash'>> {
    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new AppError('Пользователь уже существует', 409);
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await this.userRepository.create(email, hashed, role || 'user');
    const { password_hash, ...userWithoutPass } = newUser;
    return userWithoutPass;
  }

  async login(email: string, password: string): Promise<{ token: string; user: Omit<User, 'password_hash'> }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Неверные учетные данные', 401);
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      throw new AppError('Неверные учетные данные', 401);
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role });
    const { password_hash, ...userWithoutPass } = user;
    return { token, user: userWithoutPass };
  }

  async getUserById(id: number): Promise<Omit<User, 'password_hash'> | null> {
    const user = await this.userRepository.findById(id);
    if (!user) return null;
    const { password_hash, ...userWithoutPass } = user;
    return userWithoutPass;
  }
}