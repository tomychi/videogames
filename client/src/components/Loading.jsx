import s from '../styles/loading.module.css';

export const Loading = () => {
    return (
        <div className={s.content}>
            <div className={s.loader}></div>
        </div>
    );
};
