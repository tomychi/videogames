const axios = require('axios');
const { Platform } = require('../db.js');
const { API_KEY } = process.env;

const getApiPlatforms = async () => {
    const apiPlatforms = await axios.get(
        `https://api.rawg.io/api/platforms?key=${API_KEY}`
    );
    const platforms = apiPlatforms.data.results.map((e) => e.name);
    return platforms;
};

const getDbPlatforms = async () => {
    const dbPlatforms = await Platform.findAll();
    return dbPlatforms;
};

const getPlatforms = async () => {
    const apiPlatforms = await getApiPlatforms();
    const dbPlatforms = await getDbPlatforms();
    const platforms = apiPlatforms.concat(dbPlatforms);
    return platforms;
};

module.exports = {
    getPlatforms,
};
