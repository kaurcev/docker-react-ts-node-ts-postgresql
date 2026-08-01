export interface User {
  id: number;
  email: string;
  password_hash: string;
  role: 'user' | 'moderator' | 'admin';
  created_at: Date;
  updated_at: Date;
}

export type UserWithoutPassword = Omit<User, 'password_hash'>;