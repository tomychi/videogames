import axios from 'axios';

import {
    GET_VIDEOGAMES,
    GET_GENRES,
    FILTER_GAME_BY_GENRE,
    FILTER_CREATED,
    ORDER_BY_NAME,
    ORDER_BY_RATING,
    GET_NAME_VIDEOGAME,
    GET_PLATFORMS,
    GET_DETAIL,
    RESET_VIDEOGAMES,
    MEMORY_CURRENT_PAGE,
    RESET_DETAIL,
    FROM_BY_NAME_TO_VIDEOGAMES,
    TRAER_PS5,
    BUSQUEDA_EN_DIRECTO,
} from '../types';

export const getVideogames = () => {
    return async function (dispatch) {
        const json = await axios.get(`/videogames`);
        return dispatch({
            type: GET_VIDEOGAMES,
            payload: json.data,
        });
    };
};

export const getNameVideogames = (name) => {
    return async function (dispatch) {
        try {
            const json = await axios.get(`/videogames?name=${name}`);
            return dispatch({
                type: GET_NAME_VIDEOGAME,
                payload: json.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const getDetail = (id) => {
    return async function (dispatch) {
        try {
            const json = await axios.get(`/videogames/${id}`);
            return dispatch({
                type: GET_DETAIL,
                payload: json.data,
            });
        } catch (error) {
            console.log('Error al traer los detalles', error);
        }
    };
};

export const getGenres = () => {
    return async function (dispatch) {
        const json = await axios.get(`/genres`);
        return dispatch({
            type: GET_GENRES,
            payload: json.data,
        });
    };
};

export const getPlatforms = () => {
    return async function (dispatch) {
        const json = await axios.get(`/platforms`);
        return dispatch({
            type: GET_PLATFORMS,
            payload: json.data,
        });
    };
};

export const postVideogame = (payload) => {
    return async function (dispatch) {
        const json = await axios.post(`/videogames`, payload);
        return json;
    };
};

export const filterGameByGenre = (payload) => {
    return {
        type: FILTER_GAME_BY_GENRE,
        payload,
    };
};

export const traerPS5 = (payload) => {
    console.log('holaa');
    return {
        type: TRAER_PS5,
        payload,
    };
};

export const filterCreated = (payload) => {
    return {
        type: FILTER_CREATED,
        payload,
    };
};

export const orderByName = (payload) => {
    return {
        type: ORDER_BY_NAME,
        payload,
    };
};

export const orderByRating = (payload) => {
    return {
        type: ORDER_BY_RATING,
        payload,
    };
};

export const resetVideogames = () => ({ type: RESET_VIDEOGAMES });

export const memoryCurrentPage = (page) => ({
    type: MEMORY_CURRENT_PAGE,
    payload: page,
});

export const resetDetail = () => ({ type: RESET_DETAIL });

export const fromByNameToVideogames = () => ({
    type: FROM_BY_NAME_TO_VIDEOGAMES,
});

export const busquedaEnDirecto = (payload) => ({
    type: BUSQUEDA_EN_DIRECTO,
    payload,
});
