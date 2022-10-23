import s from '../styles/card.module.css';
const stars = ['⭐', '⭐', '⭐', '⭐', '⭐'];
export const Card = ({ name, image, rating, genres }) => {
    // saco los undefined del array
    const genresFiltered = genres.filter((g) => g !== undefined);

    // saco los objetosdel array
    const genresFiltered2 = genresFiltered.filter((g) => typeof g !== 'object');

    return (
        <div className={s.card}>
            <div className={s.shadow}>
                <h3>{name}</h3>
                <img
                    src={image}
                    alt='img not found'
                    width='200px'
                    height='250px'
                />
                <h5>
                    {rating
                        ? stars.slice(0, Math.round(rating)).join('')
                        : 'No rating'}
                </h5>
                <p>{genres && genresFiltered2.join(', ')}</p>
            </div>
        </div>
    );
};
