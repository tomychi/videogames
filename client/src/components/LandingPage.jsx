import { Link } from 'react-router-dom';
import s from '../styles/landingPage.module.css';

export const LandingPage = () => {
    return (
        <div className={s.content}>
            <h1 className={s.titulo}>Videogames</h1>
            <Link to='/home'>
                <button className={s.btnHome}>Home</button>
            </Link>
        </div>
    );
};
