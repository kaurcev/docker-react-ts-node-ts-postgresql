import { useActionState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from 'contexts/auth';
import s from './index.module.css';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [error, formAction, isPending] = useActionState(
    async (_prevState: string | null, formData: FormData) => {
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      const confirm = formData.get('confirm') as string;

      if (password !== confirm) {
        return 'Пароли не совпадают';
      }

      try {
        await register(email, password);
        navigate('/auth/login');
        return null;
      } catch (err: any) {
        return err.message || 'Ошибка регистрации';
      }
    },
    null
  );

  return (
    <section className={s.root}>
      <h2>Регистрация</h2>
      <form action={formAction} className={s.form}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="username"
          defaultValue=""
          required
          disabled={isPending}
        />
        <input
          name="password"
          type="password"
          placeholder="Пароль (мин. 6 символов)"
          autoComplete="new-password"
          defaultValue=""
          required
          minLength={6}
          disabled={isPending}
        />
        <input
          name="confirm"
          type="password"
          placeholder="Повторите пароль"
          autoComplete="new-password"
          defaultValue=""
          required
          minLength={6}
          disabled={isPending}
        />
        {error && <div className={s.error}>{error}</div>}
        <button type="submit" disabled={isPending}>
          {isPending ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>
      <p>
        Уже есть аккаунт? <Link to="/auth/login">Войти</Link>
      </p>
    </section>
  );
}
