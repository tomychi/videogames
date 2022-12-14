import { useDispatch } from 'react-redux';
import { filterCreated } from '../actions';

export const FilterCreatedOrApi = ({ handleCurrentPage }) => {
    const dispatch = useDispatch();

    const handleFilterCreated = (e) => {
        handleCurrentPage();
        dispatch(filterCreated(e.target.value));
    };

    return (
        <>
            {' '}
            <select
                onChange={(e) => {
                    handleFilterCreated(e);
                }}
                defaultValue='apiOrDb'
            >
                <option value='apiOrDb' disabled>
                    Api or DB
                </option>
                <option value='All'>Todos</option>
                <option value='Created'>Creados</option>
                <option value='Api'>Existentes</option>
            </select>
        </>
    );
};
