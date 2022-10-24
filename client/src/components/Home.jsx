import { useState, useEffect, Fragment } from 'react';
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
import { Navbar } from './Navbar';
import { Paginado } from './Paginado';

import s from '../styles/home.module.css';
import { Loading } from './Loading';

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
        dispatch(getGenres());
        dispatch(getVideogames());
    }, [dispatch]);

    const handleRefresh = (e) => {
        e.preventDefault();

        dispatch(getVideogames());
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
            <Navbar
                handleRefresh={handleRefresh}
                handleFilterGenre={handleFilterGenre}
                handleOrderByName={handleOrderByName}
                handleFilterCreated={handleFilterCreated}
                handleOrderByRating={handleOrderByRating}
                allGenres={allGenres}
            />
            {currentVideogames.length > 0 ? (
                <div className={s.container}>
                    {
                        // si no hay videojuegos, muestro un mensaje
                        currentVideogames.length === 0 ? (
                            <h1>No hay videojuegos</h1>
                        ) : (
                            // si hay videojuegos, los muestro
                            <div className={s.cards}>
                                {currentVideogames?.map((v, i) => (
                                    <div key={i}>
                                        <Link
                                            to={`/videogames/${v.id}`}
                                            className={s.linkCard}
                                        >
                                            <Card
                                                key={v.id}
                                                name={v.name}
                                                image={v.background_image}
                                                rating={v.rating}
                                                // agrupar los generenos en un array los que tengan el mismo id

                                                genres={
                                                    // cuando sea un array de objetos lo concateno con el spread operator
                                                    v.genres.concat(
                                                        v.genres.map(
                                                            (g) => g.name
                                                        )
                                                    )
                                                }
                                            />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )
                    }
                    <div className={s.footer}>
                        <Paginado
                            videogamesPerPage={videogamesPerPage}
                            allVideogames={allVideogames}
                            paginate={paginate}
                        />
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
};
