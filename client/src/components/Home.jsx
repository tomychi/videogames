import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, resetVideogames, memoryCurrentPage } from '../actions';
import { Link } from 'react-router-dom';
import { Card } from './Card';
import { Navbar } from './Navbar';
import { Paginado } from './Paginado';

import s from '../styles/home.module.css';
import { Loading } from './Loading';

export const Home = () => {
    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames);
    const memoryPage = useSelector((state) => state.currentPage);

    // currentPage es la pagina actual arranca en la pagina 1
    const [currentPage, setCurrentPage] = useState(memoryPage);

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

    const handleCurrentPage = () => {
        setCurrentPage(1);
        dispatch(memoryCurrentPage(1));
    };

    // nos traemos los videojuegos cuando se monta el componente
    useEffect(() => {
        dispatch(getVideogames());
    }, [dispatch]);

    const handleRefresh = (e) => {
        e.preventDefault();
        handleCurrentPage();
        dispatch(resetVideogames());
        dispatch(getVideogames());
    };

    return (
        <div>
            <Navbar
                handleRefresh={handleRefresh}
                handleCurrentPage={handleCurrentPage}
            />

            {currentVideogames.length > 0 ? (
                <div className={s.container}>
                    {
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

                                            genres={v.genres.map((g) => {
                                                if (typeof g === 'object') {
                                                    return g.name;
                                                } else {
                                                    return g;
                                                }
                                            })}
                                        />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    }
                    <div className={s.footer}>
                        <Paginado
                            videogamesPerPage={videogamesPerPage}
                            allVideogames={allVideogames}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
};
