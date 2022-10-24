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
} from '../types';

const LOCALHOST = 'http://localhost:3001';

export const getVideogames = () => {
    return async function (dispatch) {
        const json = await axios.get(`${LOCALHOST}/videogames`);
        return dispatch({
            type: GET_VIDEOGAMES,
            payload: json.data,
        });
    };
};

export const getNameVideogames = (name) => {
    return async function (dispatch) {
        try {
            const json = await axios.get(
                `${LOCALHOST}/videogames?name=${name}`
            );
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
            const json = await axios.get(`${LOCALHOST}/videogames/${id}`);
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
        const json = await axios.get(`${LOCALHOST}/genres`);
        return dispatch({
            type: GET_GENRES,
            payload: json.data,
        });
    };
};

export const getPlatforms = () => {
    return async function (dispatch) {
        const json = await axios.get(`${LOCALHOST}/platforms`);
        return dispatch({
            type: GET_PLATFORMS,
            payload: json.data,
        });
    };
};

export const postVideogame = (payload) => {
    return async function (dispatch) {
        const json = await axios.post(`${LOCALHOST}/videogames`, payload);
        return json;
    };
};

export const filterGameByGenre = (payload) => {
    return {
        type: FILTER_GAME_BY_GENRE,
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
