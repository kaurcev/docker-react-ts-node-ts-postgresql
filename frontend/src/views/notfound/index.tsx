import { Link } from 'react-router-dom';
import s from './index.module.css';

export default function NotFound() {
    return (
        <section className={s.root}>
            <h1>404</h1>
            <hr />
            <p>Страница не найдена</p>
            <Link to="/">Вернуться на главную</Link>
        </section>
    );
}