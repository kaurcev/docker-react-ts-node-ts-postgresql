import { Link } from 'react-router-dom';
import { useAuth } from 'contexts/auth';
import s from './index.module.css';

export const Header = () => {
  const { user, logout } = useAuth();
  return (
    <header className={s.header}>
      <span>шапка сайта</span>
      <nav>
        <Link to="/">Главная</Link>
        {user ? (
          <>
            <Link to="/profile">Профиль</Link>
            <button onClick={logout}>Выйти</button>
          </>
        ) : (
          <>
            <Link to="/auth/login">Войти</Link>
            <Link to="/auth/register">Регистрация</Link>
          </>
        )}
      </nav>
    </header>
  );
};