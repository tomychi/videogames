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
} from '../types';

const initialState = {
    videogames: [],
    allVideogames: [],
    genres: [],
    platforms: [],
    detail: [],
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

        case GET_PLATFORMS:
            return {
                ...state,
                platforms: action.payload,
            };

        case POST_VIDEOGAME:
            return {
                ...state,
            };
        case GET_NAME_VIDEOGAME:
            return {
                ...state,
                videogames: action.payload,
            };

        case FILTER_GAME_BY_GENRE:
            const allVideogames = state.allVideogames;
            const statusFiltered =
                action.payload === 'All'
                    ? allVideogames
                    : allVideogames.filter((game) =>
                          game.genres.includes(action.payload)
                      );
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

            return {
                ...state,
                videogames:
                    action.payload === 'All' ? allVideogames2 : createdFilter,
            };

        case ORDER_BY_NAME:
            let sortedArr =
                action.payload === 'asc'
                    ? state.videogames.sort((a, b) => {
                          if (a.name > b.name) {
                              return 1;
                          }
                          if (a.name < b.name) {
                              return -1;
                          }
                          return 0;
                      })
                    : state.videogames.sort((a, b) => {
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
                videogames: sortedArr,
            };

        case ORDER_BY_RATING:
            let sortedArr2 =
                action.payload === 'low'
                    ? state.videogames.sort((a, b) => {
                          if (a.rating > b.rating) {
                              return 1;
                          }
                          if (a.rating < b.rating) {
                              return -1;
                          }
                          return 0;
                      })
                    : state.videogames.sort((a, b) => {
                          if (a.rating > b.rating) {
                              return -1;
                          }
                          if (a.rating < b.rating) {
                              return 1;
                          }
                          return 0;
                      });

            return {
                ...state,
                videogames: sortedArr2,
            };
        case GET_DETAIL:
            return {
                ...state,
                detail: [action.payload],
            };

        default:
            return { ...state };
    }
};

export default rootReducer;
