import { Outlet } from 'react-router-dom';
import { Header } from 'components/header';
import { Footer } from 'components/footer';
import s from './index.module.css';

export const MainLayout = () => (
  <>
    <Header />
    <main className={s.root}>
      <Outlet />
    </main>
    <Footer />
  </>
);