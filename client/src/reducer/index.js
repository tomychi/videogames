import {
    GET_VIDEOGAMES,
    GET_NAME_VIDEOGAME,
    GET_GENRES,
    FILTER_GAME_BY_GENRE,
    FILTER_CREATED,
    ORDER_BY_NAME,
    ORDER_BY_RATING,
    POST_VIDEOGAME,
    GET_PLATFORMS,
    GET_DETAIL,
    RESET_VIDEOGAMES,
    MEMORY_CURRENT_PAGE,
    RESET_DETAIL,
    FROM_BY_NAME_TO_VIDEOGAMES,
} from '../types';

const initialState = {
    videogames: [],
    allVideogames: [],
    genres: [],
    platforms: [],
    detail: [],
    currentPage: 1,
    videogamesBySearch: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: [...action.payload],
                allVideogames: [...action.payload],
            };

        case GET_GENRES:
            return {
                ...state,
                genres: action.payload,
            };

        case GET_NAME_VIDEOGAME:
            return {
                ...state,
                videogames: [...action.payload],
                videogamesBySearch: [...action.payload],
            };

        case FILTER_GAME_BY_GENRE:
            let genreFilter;

            if (state.videogamesBySearch.length) {
                if (action.payload === 'All') {
                    genreFilter = [...state.videogamesBySearch];
                } else {
                    const vGames = [...state.videogamesBySearch];
                    vGames.forEach((el) => {
                        if (typeof el.genres[0] !== 'string') {
                            el.genres = el.genres.map((e) => e.name);
                        }
                    });

                    genreFilter = vGames.filter((el) =>
                        el.genres.includes(action.payload)
                    );
                }
                if (!genreFilter.length) genreFilter.push('Error');

                return {
                    ...state,
                    videogames: [...genreFilter],
                };
            } else {
                if (action.payload === 'All') {
                    genreFilter = [...state.allVideogames];
                } else {
                    const vGames = [...state.allVideogames];
                    vGames.forEach((el) => {
                        if (typeof el.genres[0] !== 'string') {
                            el.genres = el.genres.map((e) => e.name);
                        }
                    });

                    genreFilter = vGames.filter((el) =>
                        el.genres.includes(action.payload)
                    );
                }

                if (!genreFilter.length) genreFilter.push('Error');

                return {
                    ...state,
                    videogames: [...genreFilter],
                };
            }

        case FILTER_CREATED:
            let apiOrDbFilter;

            if (state.videogamesBySearch.length) {
                if (action.payload === 'All') {
                    apiOrDbFilter = [...state.videogamesBySearch];
                } else if (action.payload === 'Created') {
                    apiOrDbFilter = [...state.videogamesBySearch].filter(
                        (e) => e.createInDb
                    );
                } else {
                    apiOrDbFilter = [...state.videogamesBySearch].filter(
                        (e) => !e.createInDb
                    );
                }

                if (!apiOrDbFilter.length) apiOrDbFilter.push('Error');

                return {
                    ...state,
                    videogames: [...apiOrDbFilter],
                };
            } else {
                if (action.payload === 'All') {
                    apiOrDbFilter = [...state.allVideogames];
                } else if (action.payload === 'Created') {
                    apiOrDbFilter = [...state.allVideogames].filter(
                        (e) => e.createInDb
                    );
                } else {
                    apiOrDbFilter = [...state.allVideogames].filter(
                        (e) => !e.createInDb
                    );
                }

                if (!apiOrDbFilter.length) apiOrDbFilter.push('Error');

                return {
                    ...state,
                    videogames: [...apiOrDbFilter],
                };
            }

        case ORDER_BY_NAME:
            let alphabeticalOrder;
            if (action.payload === 'default') {
                if (state.videogamesBySearch.length)
                    alphabeticalOrder = [...state.videogamesBySearch];
                else alphabeticalOrder = [...state.allVideogames];
            } else {
                alphabeticalOrder =
                    action.payload === 'asc'
                        ? [...state.videogames].sort((a, b) => {
                              if (a.name > b.name) return 1;
                              if (b.name > a.name) return -1;
                              return 0;
                          })
                        : [...state.videogames].sort((a, b) => {
                              if (a.name > b.name) return -1;
                              if (b.name > a.name) return 1;
                              return 0;
                          });
            }
            return {
                ...state,
                videogames: [...alphabeticalOrder],
            };

        case ORDER_BY_RATING:
            let ratingSort;
            if (action.payload === 'default') {
                if (state.videogamesBySearch.length)
                    ratingSort = [...state.videogamesBySearch];
                else ratingSort = [...state.allVideogames];
            } else {
                ratingSort =
                    action.payload === 'low'
                        ? [...state.videogames].sort((a, b) => {
                              if (a.rating > b.rating) return 1;
                              if (b.rating > a.rating) return -1;
                              return 0;
                          })
                        : [...state.videogames].sort((a, b) => {
                              if (a.rating > b.rating) return -1;
                              if (b.rating > a.rating) return 1;
                              return 0;
                          });
            }

            return {
                ...state,
                videogames: [...ratingSort],
            };

        case GET_PLATFORMS:
            return {
                ...state,
                platforms: action.payload,
            };

        case POST_VIDEOGAME:
            return {
                ...state,
            };

        case GET_DETAIL:
            return {
                ...state,
                detail: [action.payload],
            };

        case RESET_VIDEOGAMES:
            return {
                ...state,
                videogames: [],
                videogamesBySearch: [],
            };

        case MEMORY_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload,
            };

        case RESET_DETAIL:
            return {
                ...state,
                detail: [],
            };

        case FROM_BY_NAME_TO_VIDEOGAMES:
            return {
                ...state,
                videogames: [...state.allVideogames],
                videogamesBySearch: [],
            };

        default:
            return { ...state };
    }
};

export default rootReducer;
