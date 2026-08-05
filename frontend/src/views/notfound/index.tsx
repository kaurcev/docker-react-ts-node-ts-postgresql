import { Link } from 'react-router-dom';
import { usePageTitle } from 'contexts/page';
import s from './index.module.css';

export default function NotFound() {
    usePageTitle('Страница не найдена');
    return (
        <section className={s.root}>
            <h1>404</h1>
            <p>Страница не найдена</p>
            <Link to="/">Вернуться на главную</Link>
        </section>
    );
}