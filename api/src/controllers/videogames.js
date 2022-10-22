const axios = require('axios');
const { Videogame, Genre } = require('../db');
const { API_KEY } = process.env;
require('dotenv').config();

// solicito la informacion de la api
const getApiInfo = async () => {
    let videogamesApi = [];
    const quantity = 100;
    try {
        const apiInfo = await axios.get(
            `https://api.rawg.io/api/games?key=${API_KEY}`
        );
        videogamesApi = [...apiInfo.data.results];

        if (quantity > 20) {
            let apiAux = apiInfo;

            for (let i = 0; videogamesApi.length < quantity; i++) {
                let api2;
                api2 = await axios.get(apiAux.data.next);
                apiAux = api2;

                if (quantity - videogamesApi.length < 20) {
                    videogamesApi = [...videogamesApi, ...api2.data.results];
                    break;
                }

                videogamesApi = [...videogamesApi, ...api2.data.results];
            }
        }

        return videogamesApi.map((game) => {
            return {
                id: game.id,
                name: game.name,
                genres: game.genres.map((g) => g.name),
                rating: game.rating,
                platforms: game.platforms.map((p) => p.platform.name),
                released: game.released,
                background_image: game.background_image,
            };
        });
    } catch (error) {
        throw new Error(`Error en la api ${error}`);
    }
};

// solicito la informacion de la base de datos
const getDbInfo = async () => {
    return await Videogame.findAll({
        include: {
            model: Genre, // me trae el nombre del genero
            attributes: ['name'],
            through: {
                // me trae los atributs (name)
                attributes: [],
            },
        },
    });
};

const getVideogameApiById = async (idVideogame) => {
    try {
        const apiInfo = await axios.get(
            `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`
        );

        const {
            id,
            name,
            background_image,
            rating,
            genres,
            description_raw: description,
            released,
            platforms,
        } = apiInfo.data;

        const objVideogame = {
            id,
            name,
            background_image,
            rating,
            genres: genres.map((g) => g.name),
            description,
            released,
            platforms: platforms.map((p) => p.platform.name),
        };

        return objVideogame;
    } catch (error) {
        throw new Error(`Error en la api ${error}`);
    }
};

// GET VIDEOGAME BY ID --------------------------------------------------------
const getVideogameById = async (req, res) => {
    const { id } = req.params;

    try {
        if (id) {
            const dbVideogames = await getDbInfo();

            const videoGameFoundDb = dbVideogames.find(
                (game) => game.id === id
            );

            if (videoGameFoundDb) return res.status(200).send(videoGameFoundDb);

            const videoGameFoundApi = await getVideogameApiById(id);

            return res.status(200).send(videoGameFoundApi);
        }
    } catch (error) {
        // console.log(error);
        return res.status(404).send(videoGameFoundApi);
    }
};

const getAllVideoGames = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allVideoGames = apiInfo.concat(dbInfo);
    return allVideoGames;
};

module.exports = {
    getAllVideoGames,
    getVideogameById,
};
