const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Genre } = require('../db');

const loadGenres = async (db = false) => {
    let genres = [];

    const genresExist = await Genre.findAll();

    if (!genresExist.length) {
        const api = await axios.get(
            `https://api.rawg.io/api/genres?key=${API_KEY}`
        );

        genres = [...api.data.results];

        // Filter - Info
        genres = genres.map((genre) => {
            const { id, name } = genre;
            const obj = {
                id,
                name,
            };

            return obj;
        });
    }

    if (db && !genresExist.length) await Genre.bulkCreate(genres);

    return genres;
};

const getGenres = async (req, res) => {
    try {
        const genres = await Genre.findAll();
        // extraigo el name de genres
        const genresName = genres.map((genre) => genre.name);

        return res.status(200).send(genresName);
    } catch (error) {
        return res.status(404).send('No se encontraron géneros', error);
    }
};

module.exports = {
    loadGenres,
    getGenres,
};
