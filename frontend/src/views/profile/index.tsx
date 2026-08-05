import { useAuth } from 'contexts/auth';
import { usePageTitle } from 'contexts/page';
import s from './index.module.css';

export default function Profile() {
  const { user, logout } = useAuth();
  usePageTitle('Профиль');
  return (
    <section className={s.root}>
      <h2>Мой профиль</h2>
      <div className={s.info}>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Роль:</strong> {user?.role}</p>
        <p><strong>ID:</strong> {user?.id}</p>
      </div>
      <button onClick={logout} className={s.logout}>Выйти</button>
    </section>
  );
}