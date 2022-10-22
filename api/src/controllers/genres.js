const axios = require('axios');
const { API_KEY } = process.env;
const { Genre } = require('../db');

const getApiGenres = async () => {
    const apiUrl = await axios.get(
        `https://api.rawg.io/api/genres?key=${API_KEY}`
    );

    // extraigo los datos que necesito
    const generos = apiUrl.data.results.map((e) => e.name);

    // guardo los datos en la base de datos
    generos.map((e) => {
        Genre.findOrCreate({
            where: {
                name: e,
            },
        });
    });

    return generos;
};

module.exports = {
    getApiGenres,
};
