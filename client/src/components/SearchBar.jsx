import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    getNameVideogames,
    resetVideogames,
    busquedaEnDirecto,
} from '../actions';

export const SearchBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
        dispatch(busquedaEnDirecto(name.trim()));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim().length) {
            dispatch(resetVideogames());
            dispatch(getNameVideogames(name.trim()));
            setName('');
        }
    };

    return (
        <div>
            <input
                type='text'
                value={name}
                placeholder='Buscar...'
                onChange={(e) => {
                    handleInputChange(e);
                }}
            />
            <button
                type='submit'
                onClick={(e) => {
                    handleSubmit(e);
                }}
            >
                Buscar
            </button>
        </div>
    );
};
