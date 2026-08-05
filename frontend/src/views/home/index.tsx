import s from './index.module.css';
import { usePageTitle } from 'contexts/page';

export default function Home() {
    usePageTitle('Главная');
    return (
        <section className={s.root}>
            <h1>Главная</h1>
            <p>Главная страница</p>
        </section>
    );
}