import { Link } from 'react-router-dom';
import s from '../styles/navbar.module.css';
import { SearchBar } from './SearchBar';

export const Navbar = ({
    handleRefresh,
    handleFilterGenre,
    handleOrderByName,
    handleFilterCreated,
    handleOrderByRating,
    allGenres,
}) => {
    return (
        <div className={s.navbar}>
            <h1 className={s.logo}>videogames</h1>
            <div>
                <Link to='/videogame'>
                    <button>Create</button>
                </Link>
                <button
                    onClick={(e) => {
                        handleRefresh(e);
                    }}
                >
                    Refresh
                </button>
            </div>
            <div className={s.filterContainer}>
                <select
                    onChange={(e) => {
                        handleFilterGenre(e);
                    }}
                >
                    <option value='All'>All</option>
                    {allGenres.map((genre, i) => (
                        <option key={i} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>

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

                <select
                    onChange={(e) => {
                        handleFilterCreated(e);
                    }}
                    defaultValue='All'
                >
                    <option value='All'>Todos</option>
                    <option value='Created'>Creados</option>
                    <option value='Api'>Existentes</option>
                </select>
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

                <SearchBar />
            </div>
        </div>
    );
};
