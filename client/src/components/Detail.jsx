import { getDetail } from '../actions';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from './Loading';

import s from '../styles/detail.module.css';
const stars = ['⭐', '⭐', '⭐', '⭐', '⭐'];

export const Detail = ({ match }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(match.params.id));
    }, [dispatch, match.params.id]);

    const detail = useSelector((state) => state.detail);

    // pequeña validación para ver si es un id de la base de datos
    const esIdSequelize = (id) => {
        if (id.length === 36) {
            return true;
        } else {
            return false;
        }
    };

    return (
        // si game es undefined no renderizo nada
        detail.length > 0 ? (
            <div className={s.detail}>
                <div className={s.detailContainer}>
                    <div className={s.detailImg}>
                        <img
                            src={detail[0].background_image}
                            alt={detail[0].name}
                        />
                    </div>
                    <div className={s.detailInfo}>
                        <h2>{detail[0].name}</h2>
                        <p>
                            <label>Released: </label> {detail[0].released}
                        </p>
                        <p>
                            <label>Rating: </label>{' '}
                            {detail[0].rating
                                ? stars
                                      .slice(0, Math.round(detail[0].rating))
                                      .join('') +
                                  ' ' +
                                  detail[0].rating
                                : 'No rating'}
                        </p>
                        <p className={s.removeComa}>
                            <label>Platforms: </label>
                            {detail[0].platforms.map((p) => p + ', ') ||
                                'No platforms'}
                        </p>
                        <p className={s.removeComa}>
                            <label>Genres: </label>
                            {esIdSequelize(detail[0].id) // si es id de sequeliza
                                ? detail[0].genres.map((g) => g.name + ', ') ||
                                  'No genres'
                                : detail[0].genres.map((g) => g + ', ') ||
                                  'No genres '}
                        </p>
                        <p>
                            <label>Description: </label> {detail[0].description}
                        </p>
                    </div>
                </div>
                <div>
                    <Link to='/home'>
                        <button className={s.buttonsBack}>Back</button>
                    </Link>
                </div>
            </div>
        ) : (
            <Loading />
        )
    );
};
