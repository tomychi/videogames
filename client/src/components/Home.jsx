import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, resetVideogames, memoryCurrentPage } from '../actions';
import { Navbar } from './Navbar';
import { Paginado } from './Paginado';
import { ErrorNotFound } from './ErrorNotFound';
import { Loading } from './Loading';
import { ContainerCards } from './ContainerCards';

import s from '../styles/home.module.css';

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

    const handleRefresh = (e) => {
        e.preventDefault();
        handleCurrentPage();
        dispatch(resetVideogames());
        dispatch(getVideogames());
    };

    useEffect(() => {
        dispatch(getVideogames());
    }, [dispatch]);

    return (
        <div>
            <Navbar
                handleRefresh={handleRefresh}
                handleCurrentPage={handleCurrentPage}
            />
            {allVideogames.length === 1 && allVideogames[0] === 'Error' ? (
                <ErrorNotFound />
            ) : allVideogames.length === 0 ? (
                <Loading />
            ) : (
                <div>
                    <ContainerCards
                        currentVideogames={currentVideogames}
                        allVideogames={allVideogames}
                    />
                    <div className={s.footer}>
                        <Paginado
                            videogamesPerPage={videogamesPerPage}
                            allVideogames={allVideogames}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
