import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameVideogames } from '../actions';

export const SearchBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getNameVideogames(name));
        setName('');
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
