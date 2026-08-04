import type { QueryResult } from 'pg';
import { pool } from '../config/database.js';
import type { User } from '../models/user.js';

export interface IUserRepository {
  create(email: string, passwordHash: string, role: string): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  updateRole(id: number, role: string): Promise<void>;
}

export class UserRepository implements IUserRepository {
  async create(email: string, passwordHash: string, role: string = 'user'): Promise<User> {
    const query = `
      INSERT INTO users (email, password_hash, role)
      VALUES ($1, $2, $3)
      RETURNING id, email, role, created_at, updated_at;
    `;
    const result: QueryResult<User> = await pool.query(query, [email, passwordHash, role]);
    return result.rows[0];
  }

  async findByEmail(email: string): Promise<User | null> {
    const query = `SELECT * FROM users WHERE email = $1;`;
    const result: QueryResult<User> = await pool.query(query, [email]);
    return result.rows[0] || null;
  }

  async findById(id: number): Promise<User | null> {
    const query = `SELECT * FROM users WHERE id = $1;`;
    const result: QueryResult<User> = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  async updateRole(id: number, role: string): Promise<void> {
    const query = `UPDATE users SET role = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2;`;
    await pool.query(query, [role, id]);
  }
}