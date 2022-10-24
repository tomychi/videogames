require('dotenv').config();
const axios = require('axios');
const { Platform } = require('../db.js');
const { API_KEY } = process.env;

const loadPlatforms = async (db = false) => {
    let platforms = [];

    const platformsExist = await Platform.findAll();

    if (!platformsExist.length) {
        const api = await axios.get(
            `https://api.rawg.io/api/platforms?key=${API_KEY}`
        );

        platforms = [...api.data.results];

        // Filter - Info
        platforms = platforms.map((platform) => {
            const { id, name } = platform;
            const obj = {
                id,
                name,
            };

            return obj;
        });
    }

    if (db && !platformsExist.length) await Platform.bulkCreate(platforms);

    return platforms;
};

const getPlatforms = async (req, res) => {
    try {
        const platforms = await Platform.findAll();
        // extraigo el el name de cada plataforma
        const platformsNames = platforms.map((platform) => platform.name);

        return res.status(200).send(platformsNames);
    } catch (error) {
        return res.status(404).send('No se encontraron plataformas', error);
    }
};

module.exports = {
    loadPlatforms,
    getPlatforms,
};
