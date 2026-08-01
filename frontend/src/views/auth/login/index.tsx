import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from 'contexts/auth';
import s from './index.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Ошибка входа');
    }
  };

  return (
    <section className={s.root}>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit} className={s.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <div className={s.error}>{error}</div>}
        <button type="submit">Войти</button>
      </form>
      <p>
        Нет аккаунта? <Link to="/auth/register">Зарегистрироваться</Link>
      </p>
    </section>
  );
}