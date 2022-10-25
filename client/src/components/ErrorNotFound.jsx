import error from '../assets/error.gif';
import s from '../styles/errorNotFound.module.css';

export const ErrorNotFound = () => {
    return (
        <div className={s.contentError}>
            <p>Sorry, This Content Was Not Found</p>
            <img src={error} alt='Page Not Found' />
        </div>
    );
};
