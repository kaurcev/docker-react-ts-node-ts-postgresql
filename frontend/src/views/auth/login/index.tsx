import { useActionState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from 'contexts/auth';
import { usePageTitle } from 'contexts/page';
import s from './index.module.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  usePageTitle('Авторизация');

  const [error, formAction, isPending] = useActionState(
    async (_prevState: string | null, formData: FormData) => {
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      try {
        await login(email, password);
        navigate('/');
        return null;
      } catch (err: any) {
        return err.message || 'Ошибка входа';
      }
    },
    null
  );

  return (
    <section className={s.root}>
      <h2>Вход</h2>
      <form action={formAction} className={s.form}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="username"
          required
          disabled={isPending}
        />
        <input
          name="password"
          type="password"
          placeholder="Пароль"
          autoComplete="current-password"
          required
          disabled={isPending}
        />
        
        {error && <div className={s.error}>{error}</div>}
        
        <button type="submit" disabled={isPending}>
          {isPending ? 'Вход...' : 'Войти'}
        </button>
      </form>
      <p>
        Нет аккаунта? <Link to="/auth/register">Зарегистрироваться</Link>
      </p>
    </section>
  );
}
