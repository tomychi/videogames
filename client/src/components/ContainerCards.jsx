import { Card } from './Card';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fromByNameToVideogames } from '../actions';
import s from '../styles/home.module.css';
export const ContainerCards = ({ currentVideogames, allVideogames }) => {
    const dispatch = useDispatch();

    const handleFromByNameToVideogames = () => {
        dispatch(fromByNameToVideogames());
    };

    const videogamesBySearch = useSelector((state) => state.videogamesBySearch);
    return (
        <div className={s.container}>
            {allVideogames.length <= 15 &&
            allVideogames.length >= 1 &&
            videogamesBySearch.length ? (
                <div>
                    <button
                        type='button'
                        onClick={handleFromByNameToVideogames}
                        className={s.buttonAll}
                    >
                        All videogames
                    </button>
                </div>
            ) : null}

            {
                <div className={s.cards}>
                    {currentVideogames?.map((v, i) => (
                        <div key={i}>
                            <Link
                                to={`/videogames/${v.id}`}
                                className={s.linkCard}
                            >
                                <Card
                                    key={v.id}
                                    name={v.name}
                                    image={v.background_image}
                                    rating={v.rating}
                                    genres={v.genres.map((g) => {
                                        if (typeof g === 'object') {
                                            return g.name;
                                        } else {
                                            return g;
                                        }
                                    })}
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
};
