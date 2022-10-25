import { useDispatch } from 'react-redux';
import { orderByRating } from '../actions';
export const FilterRating = ({ handleCurrentPage }) => {
    const dispatch = useDispatch();

    const handleOrderByRating = (e) => {
        handleCurrentPage();
        dispatch(orderByRating(e.target.value));
    };
    return (
        <>
            <select
                onChange={(e) => {
                    handleOrderByRating(e);
                }}
                defaultValue='rating'
            >
                <option value='rating' disabled>
                    Rating
                </option>
                <option value='low'>Low to High</option>
                <option value='high'>High to Low</option>
            </select>
        </>
    );
};
