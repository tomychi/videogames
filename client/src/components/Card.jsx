import imageDefault from '../assets/imageDefault.gif';
import s from '../styles/card.module.css';
const stars = ['⭐', '⭐', '⭐', '⭐', '⭐'];

export const Card = ({ name, image, rating, genres }) => {
    return (
        <div className={s.card}>
            <div className={s.shadow}>
                <h3>{name}</h3>
                <img
                    src={image ? image : imageDefault}
                    alt={name}
                    width='200px'
                    height='250px'
                />
                <h5>
                    {rating
                        ? stars.slice(0, Math.floor(rating)).join('')
                        : `No rating`}
                </h5>
                <p>{genres.length ? genres.toString() : `No Genres`}</p>
            </div>
        </div>
    );
};
