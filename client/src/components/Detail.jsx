import { getDetail } from '../actions';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
            <div className='detail'>
                <div className='detailContainer'>
                    <div className='detailImg'>
                        <img
                            src={detail[0].background_image}
                            alt={detail[0].name}
                        />
                    </div>
                    <div className='detailInfo'>
                        <h2>{detail[0].name}</h2>
                        <p>Released: {detail[0].released}</p>
                        <p>Rating: {detail[0].rating}</p>
                        <p>Platforms: {detail[0].platforms.map((p) => p)}</p>
                        <p>
                            Genres:{' '}
                            {esIdSequelize(detail[0].id) // si es id de sequeliza
                                ? detail[0].genres.map((g) => g.name)
                                : detail[0].genres.map((g) => g)}
                        </p>
                        <p>Description: {detail[0].description}</p>
                    </div>
                </div>
                <div className='buttonsBack'>
                    <Link to='/home'>
                        <button className='buttonsBack'>Back</button>
                    </Link>
                </div>
            </div>
        ) : (
            <h1> Loading... </h1>
        )
    );
};
