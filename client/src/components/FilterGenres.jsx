import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGenres, filterGameByGenre } from '../actions';

export const FilterGenres = ({ handleCurrentPage }) => {
    const dispatch = useDispatch();
    const allGenres = useSelector((state) => state.genres);

    useEffect(() => {
        if (!allGenres.length) {
            dispatch(getGenres());
        }
    }, [dispatch, allGenres]);

    const handleFilterGameByGenre = (e) => {
        handleCurrentPage();
        dispatch(filterGameByGenre(e.target.value));
    };

    return (
        <>
            <select
                onChange={(e) => {
                    handleFilterGameByGenre(e);
                }}
                defaultValue='Genres'
            >
                <option value='Genres' disabled>
                    {' '}
                    Genres{' '}
                </option>
                <option value='All'>All</option>
                {allGenres.map((genre, i) => (
                    <option key={i} value={genre}>
                        {genre}
                    </option>
                ))}
            </select>
        </>
    );
};
