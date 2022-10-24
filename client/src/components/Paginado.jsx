import { useDispatch } from 'react-redux';
import { memoryCurrentPage } from '../actions';
import s from '../styles/paginado.module.css';

export const Paginado = ({
    videogamesPerPage,
    allVideogames,
    currentPage,
    setCurrentPage,
}) => {
    const dispatch = useDispatch();
    const pageNumbers = [];
    const lastPage = Math.ceil(allVideogames.length / videogamesPerPage);
    for (let i = 1; i <= Math.ceil(lastPage); i++) {
        pageNumbers.push(i);
    }
    const paginated = (page) => {
        if (typeof page === 'number') {
            setCurrentPage(page);
            dispatch(memoryCurrentPage(page));
        }

        if (page === 'next') {
            setCurrentPage(currentPage + 1);
            dispatch(memoryCurrentPage(currentPage + 1));
        }

        if (page === 'prev') {
            setCurrentPage(currentPage - 1);
            dispatch(memoryCurrentPage(currentPage - 1));
        }
    };
    return (
        <nav>
            <ul className={s.paginado}>
                {pageNumbers.length > 1 && (
                    <li key='next'>
                        <button
                            onClick={() => paginated('prev')}
                            className={s.active}
                            disabled={currentPage === 1}
                        >
                            {'<'}
                        </button>
                    </li>
                )}
                {pageNumbers &&
                    pageNumbers.map((number) => (
                        <li key={number}>
                            <a
                                onClick={() => paginated(number)}
                                href='#!'
                                className={s.number}
                            >
                                {number}
                            </a>
                        </li>
                    ))}
                {pageNumbers.length > 1 && (
                    <li key='next'>
                        <button
                            onClick={() => paginated('next')}
                            className={s.active}
                            disabled={currentPage === lastPage}
                        >
                            {'>'}
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
};
