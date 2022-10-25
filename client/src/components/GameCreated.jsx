import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
    getGenres,
    postVideogame,
    getPlatforms,
    resetVideogames,
    getVideogames,
} from '../actions';
import s from '../styles/gameCreated.module.css';

const validate = (input) => {
    let errors = {};
    if (!input.name) {
        errors.name = 'El nombre es requerido';
    } else if (!/^[A-Za-z0-9 ]+$/.test(input.name)) {
        errors.name = 'El nombre solo puede contener letras y numeros';
    }
    if (!input.description) {
        errors.description = 'La descripcion es requerida';
        // longitud minima de 15 caracteres hasta 150
    } else if (input.description.length < 15) {
        errors.description = 'La descripcion debe tener al menos 15 caracteres';
    } else if (input.description.length > 150) {
        errors.description =
            'La descripcion debe tener menos de 150 caracteres';
    }

    if (!input.released) {
        errors.released = 'La fecha de lanzamiento es requerida';
    }
    if (!input.rating) {
        errors.rating = 'El rating es requerido';
    } else if (!/^[0-5]+$/.test(input.rating)) {
        errors.rating = 'El rating solo puede contener numeros del 0 al 5';
    }
    if (!input.background_image) {
        errors.background_image = 'La imagen es requerida';
    } else if (!/^(http|https):\/\/[^ "]+$/.test(input.background_image)) {
        errors.background_image = 'La imagen debe ser una url';
    }

    if (input.genres.length > 5 || input.genres.length === 0) {
        errors.genres = 'Debe seleccionar al menos 1 y hasta 5 generos';
    }

    if (input.platforms.length > 5 || input.platforms.length === 0) {
        errors.platforms = 'Debe seleccionar al menos 1 y hasta 5 plataformas';
    }

    return errors;
};

export const GameCreated = () => {
    const dispatch = useDispatch();
    const allGenres = useSelector((state) => state.genres);
    const allPlatforms = useSelector((state) => state.platforms);
    const history = useHistory();
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: '',
        description: '',
        released: '',
        rating: '',
        platforms: [],
        genres: [],
        background_image: '',
    });

    useEffect(() => {
        dispatch(getGenres());
        dispatch(getPlatforms());
    }, [dispatch]);

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });

        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
    };

    const handleSelect = (e) => {
        if (e.target.name === 'platforms') {
            setInput({
                ...input,
                platforms: [...new Set([...input.platforms, e.target.value])],
            });

            setErrors(
                validate({
                    ...input,
                    platforms: [
                        ...new Set([...input.platforms, e.target.value]),
                    ],
                })
            );
        }

        if (e.target.name === 'genres') {
            setInput({
                ...input,
                genres: [...new Set([...input.genres, e.target.value])],
            });

            setErrors(
                validate({
                    ...input,
                    genres: [...new Set([...input.genres, e.target.value])],
                })
            );
        }
    };

    const handleSubmit = (e) => {
        if (Object.keys(errors).length === 0) {
            e.preventDefault();
            dispatch(postVideogame(input));
            alert('Videojuego Creado!');
            setInput({
                name: '',
                description: '',
                released: '',
                rating: '',
                platforms: [],
                genres: [],
                background_image: '',
            });
            history.push('/home');
            dispatch(resetVideogames());
            dispatch(getVideogames());
        } else {
            alert('Verifique los datos ingresados');
        }
    };

    const handleDeletePlatforms = (e, p) => {
        e.preventDefault();
        setInput({
            ...input,
            platforms: input.platforms.filter((platform) => platform !== p),
        });

        setErrors(
            validate({
                ...input,
                platforms: input.platforms.filter((platform) => platform !== p),
            })
        );
    };

    const handleDeleteGenres = (e, g) => {
        e.preventDefault();
        setInput({
            ...input,
            genres: input.genres.filter((genre) => genre !== g),
        });

        setErrors(
            validate({
                ...input,
                genres: input.genres.filter((genre) => genre !== g),
            })
        );
    };

    const validator =
        input.name &&
        input.description &&
        input.released &&
        input.rating &&
        input.background_image &&
        input.genres.length &&
        input.platforms.length
            ? true
            : false;

    return (
        <div className={s.gameCreated}>
            <div>
                <Link to='/home'>
                    <button className={s.homeBtn}>Home</button>
                </Link>
            </div>
            <h2>Crea tu juego</h2>
            <div className={s.form}>
                <form
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}
                >
                    <div className={s.containerInputsAndSelects}>
                        <div className={s.left}>
                            <div className={s.inputContainer}>
                                <div className={s.separador}>
                                    <label>Nombre: </label>
                                    <input
                                        type='text'
                                        name='name'
                                        value={input.name}
                                        onChange={handleInputChange}
                                        placeholder='Nombre'
                                    />
                                </div>
                                {errors.name && (
                                    <p className={s.errorMessages}>
                                        {errors.name}
                                    </p>
                                )}
                                <div className={s.separador}>
                                    <label>Descripción: </label>
                                    <textarea
                                        type='text'
                                        name='description'
                                        value={input.description}
                                        onChange={handleInputChange}
                                        placeholder={'es un juego de...'}
                                    />
                                </div>
                                {errors.description && (
                                    <p className={s.errorMessages}>
                                        {errors.description}
                                    </p>
                                )}

                                <div className={s.separador}>
                                    <label>Released: </label>
                                    <input
                                        type='date'
                                        name='released'
                                        value={input.released}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                {errors.released && (
                                    <p className={s.errorMessages}>
                                        {errors.released}
                                    </p>
                                )}

                                <div className={s.separador}>
                                    <label>Rating: </label>
                                    <input
                                        type='text'
                                        name='rating'
                                        value={input.rating}
                                        onChange={handleInputChange}
                                        placeholder='3'
                                    />
                                </div>
                                {errors.rating && (
                                    <p className={s.errorMessages}>
                                        {errors.rating}
                                    </p>
                                )}
                                <div className={s.separador}>
                                    <label>Imagen: </label>
                                    <input
                                        type='text'
                                        name='background_image'
                                        value={input.background_image}
                                        onChange={handleInputChange}
                                        placeholder='URL'
                                    />
                                </div>
                                {errors.background_image && (
                                    <p className={s.errorMessages}>
                                        {errors.background_image}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className={s.right}>
                            <div className={s.selectContainer}>
                                <label>Plataformas: </label>
                                <select
                                    name='platforms'
                                    defaultValue={'DEFAULT'}
                                    onChange={handleSelect}
                                    disabled={input.platforms.length === 5}
                                >
                                    <option value={'DEFAULT'} disabled>
                                        Selecciona una plataforma
                                    </option>
                                    {allPlatforms.map((p, i) => (
                                        <option value={p} key={i}>
                                            {p}
                                        </option>
                                    ))}
                                </select>

                                {errors.platforms && (
                                    <p className={s.errorMessages}>
                                        {errors.platforms}
                                    </p>
                                )}
                                <div className={s.platformsContainer}>
                                    {input.platforms?.map((p, i) => (
                                        <div key={i} className={s.platforms}>
                                            <p>{p}</p>
                                            <button
                                                onClick={(e) =>
                                                    handleDeletePlatforms(e, p)
                                                }
                                                className={s.deleteBtn}
                                            >
                                                X
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <label>Géneros: </label>
                                <select
                                    name='genres'
                                    defaultValue={'DEFAULT'}
                                    onChange={handleSelect}
                                    disabled={input.genres.length === 5}
                                >
                                    <option value={'DEFAULT'} disabled>
                                        Selecciona un genero
                                    </option>
                                    {allGenres.map((genre, i) => (
                                        <option key={i} value={genre}>
                                            {genre}
                                        </option>
                                    ))}
                                </select>
                                {errors.genres && (
                                    <p className={s.errorMessages}>
                                        {errors.genres}
                                    </p>
                                )}

                                <div className={s.genresContainer}>
                                    {input.genres?.map((genre, i) => (
                                        <div key={i} className={s.genres}>
                                            <p>{genre}</p>
                                            <button
                                                onClick={(e) =>
                                                    handleDeleteGenres(e, genre)
                                                }
                                                className={s.deleteBtn}
                                            >
                                                X
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* deshabilitar el boton por defecto y si hay errores tambien */}

                    <button
                        type='submit'
                        disabled={
                            Object.keys(errors).length || !validator
                                ? true
                                : false
                        }
                        className={s.createdBtn}
                    >
                        Crear
                    </button>
                </form>
            </div>
        </div>
    );
};
