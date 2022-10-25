import { useDispatch } from 'react-redux';
import { orderByName } from '../actions';

export const AlphabeticalSort = ({ handleCurrentPage }) => {
    const dispatch = useDispatch();

    const handleOrderByName = (e) => {
        handleCurrentPage();
        dispatch(orderByName(e.target.value));
    };

    return (
        <>
            <select
                onChange={(e) => {
                    handleOrderByName(e);
                }}
                defaultValue='Ordenar'
            >
                <option value='Ordenar' disabled>
                    Ordenar A-Z
                </option>
                <option value='asc'>Ascendente</option>
                <option value='desc'>Descendente</option>
            </select>
        </>
    );
};
