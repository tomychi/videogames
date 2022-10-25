import { Link } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { AlphabeticalSort } from './AlphabeticalSort';
import { FilterCreatedOrApi } from './FilterCreatedOrApi';
import { FilterGenres } from './FilterGenres';
import { FilterRating } from './FilterRating';

import s from '../styles/navbar.module.css';

export const Navbar = ({ handleRefresh, handleCurrentPage }) => {
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
                <AlphabeticalSort handleCurrentPage={handleCurrentPage} />
                <FilterCreatedOrApi handleCurrentPage={handleCurrentPage} />
                <FilterGenres handleCurrentPage={handleCurrentPage} />
                <FilterRating handleCurrentPage={handleCurrentPage} />
                <SearchBar />
            </div>
        </div>
    );
};
