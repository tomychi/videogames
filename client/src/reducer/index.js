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
                videogames: action.payload,
                allVideogames: action.payload,
            };

        case GET_GENRES:
            return {
                ...state,
                genres: action.payload,
            };

        case GET_NAME_VIDEOGAME:
            return {
                ...state,
                videogames: action.payload,
                videogamesBySearch: action.payload,
            };

        case FILTER_GAME_BY_GENRE:
            const allVideogames = state.allVideogames;
            const statusFiltered =
                action.payload === 'All'
                    ? allVideogames
                    : allVideogames.filter((game) =>
                          game.genres.includes(action.payload)
                      );

            if (!statusFiltered.length) {
                statusFiltered.push('Error');
            }

            return {
                ...state,
                videogames: statusFiltered,
            };

        case FILTER_CREATED:
            const allVideogames2 = state.allVideogames;
            const createdFilter =
                action.payload === 'Created'
                    ? allVideogames2.filter((game) => game.createInDb)
                    : allVideogames2.filter((game) => !game.createInDb);

            if (!createdFilter.length) {
                createdFilter.push('Error');
            }

            return {
                ...state,
                videogames:
                    action.payload === 'All' ? allVideogames2 : createdFilter,
            };

        case ORDER_BY_NAME:
            let alphabeticalOrder =
                action.payload === 'asc'
                    ? [...state.videogames].sort((a, b) => {
                          if (a.name > b.name) {
                              return 1;
                          }
                          if (a.name < b.name) {
                              return -1;
                          }
                          return 0;
                      })
                    : [...state.videogames].sort((a, b) => {
                          if (a.name > b.name) {
                              return -1;
                          }
                          if (a.name < b.name) {
                              return 1;
                          }
                          return 0;
                      });
            return {
                ...state,
                videogames: [...alphabeticalOrder],
            };

        case ORDER_BY_RATING:
            let ratingSort =
                action.payload === 'low'
                    ? [...state.videogames].sort((a, b) => {
                          if (a.rating > b.rating) {
                              return 1;
                          }
                          if (a.rating < b.rating) {
                              return -1;
                          }
                          return 0;
                      })
                    : [...state.videogames].sort((a, b) => {
                          if (a.rating < b.rating) {
                              return 1;
                          }
                          if (a.rating > b.rating) {
                              return -1;
                          }
                          return 0;
                      });

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
