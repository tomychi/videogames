import s from '../styles/paginado.module.css';

export const Paginado = ({ videogamesPerPage, allVideogames, paginate }) => {
    const pageNumbers = [];
    for (
        let i = 1;
        i <= Math.ceil(allVideogames.length / videogamesPerPage);
        i++
    ) {
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul className={s.paginado}>
                {pageNumbers &&
                    pageNumbers.map((number) => (
                        <li key={number}>
                            <a
                                onClick={() => paginate(number)}
                                href='##'
                                className={s.number}
                            >
                                {number}
                            </a>
                        </li>
                    ))}
            </ul>
        </nav>
    );
};
