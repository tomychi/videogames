import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getVideogames,
    getGenres,
    filterGameByGenre,
    filterCreated,
    orderByName,
    orderByRating,
} from '../actions';
import { Link } from 'react-router-dom';
import { Card } from './Card';
import { Paginado } from './Paginado';
import { SearchBar } from './SearchBar';

import s from '../styles/home.module.css';

export const Home = () => {
    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames);
    const allGenres = useSelector((state) => state.genres);

    // solo para que me haga el seteo de los estados
    const [orden, setOrden] = useState('');

    // currentPage es la pagina actual arranca en la pagina 1
    const [currentPage, setCurrentPage] = useState(1);

    // cuantos juegos quiero mostrar por pagina (por defecto 15)
    const [videogamesPerPage] = useState(15);

    // indice del ultimo juego de la pagina actual
    const indexOfLastVideogame = currentPage * videogamesPerPage;

    // indice del primer juego de la pagina actual
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;

    // juegos de la pagina actual
    const currentVideogames = allVideogames.slice(
        indexOfFirstVideogame,
        indexOfLastVideogame
    );

    // cambio de pagina
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // nos traemos los videojuegos cuando se monta el componente
    useEffect(() => {
        dispatch(getVideogames());
        dispatch(getGenres());
    }, [dispatch]);

    const handleReload = (e) => {
        e.preventDefault();
        dispatch(getVideogames());

        // reseteo el estado de orden
        setOrden('');

        // reseteo el estado de la pagina actual
        setCurrentPage(1);
    };

    const handleFilterGenre = (e) => {
        e.preventDefault();
        dispatch(filterGameByGenre(e.target.value));
    };

    const handleFilterCreated = (e) => {
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
    };

    const handleOrderByName = (e) => {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado: ${e.target.value}`);
    };

    const handleOrderByRating = (e) => {
        e.preventDefault();
        dispatch(orderByRating(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado: ${e.target.value}`);
        console.log(orden);
    };
    return (
        <div>
            <Link to='/videogame'>Create Videogame</Link>
            <h1>JUEGOS</h1>
            <button
                onClick={(e) => {
                    handleReload(e);
                }}
            >
                Reload
            </button>

            <div>
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

                <Paginado
                    videogamesPerPage={videogamesPerPage}
                    allVideogames={allVideogames}
                    paginate={paginate}
                />

                <SearchBar />

                {
                    // si no hay videojuegos, muestro un mensaje
                    currentVideogames.length === 0 ? (
                        <h1>No hay videojuegos</h1>
                    ) : (
                        // si hay videojuegos, los muestro
                        currentVideogames.map((v, i) => (
                            <div key={i}>
                                <Link to={`/videogames/${v.id}`}>
                                    <Card
                                        key={v.id}
                                        name={v.name}
                                        image={v.background_image}
                                        rating={v.rating}
                                        // agrupar los generenos en un array los que tengan el mismo id

                                        genres={
                                            // cuando sea un array de objetos lo concateno con el spread operator
                                            v.genres.concat(
                                                v.genres.map((g) => g.name)
                                            )
                                        }
                                    />
                                </Link>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    );
};
