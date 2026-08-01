import { Outlet } from 'react-router-dom';
import s from './index.module.css';

export const EmptyLayout = () => (
  <section className={s.empty}>
    <Outlet />
  </section>
);