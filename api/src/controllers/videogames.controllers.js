const axios = require('axios');
const { Videogame, Genre } = require('../db');
const { API_KEY } = process.env;

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
    try {
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
    } catch (error) {
        throw new Error(`Error en la base de datos ${error}`);
    }
};

const getVideogamesApiByName = async (name, quantity) => {
    try {
        const apiInfo = await axios.get(
            `https://api.rawg.io/api/games?key=${API_KEY}&search=${name.trim()}`
        );
        let apiInfo2 = apiInfo.data.results.slice(0, quantity);

        return apiInfo2;
    } catch (error) {
        throw new Error(`Error en la api al traer por nombre ${error}`);
    }
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
        throw new Error(`Error en la api al traer por ID ${error}`);
    }
};

// GET VIDEOGAME BY ID
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
        return res.status(404).send(videoGameFoundApi);
    }
};

const getAllVideoGames = async (req, res) => {
    const name = req.query.name;
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();

    if (name) {
        let name2 = name.toLowerCase().trim();
        let quantity = 15;
        let nameDb = dbInfo.filter((game) =>
            game.name.toLowerCase().includes(name2)
        );
        if (nameDb) {
            quantity = 15 - nameDb.length;
        }

        let videogames = await getVideogamesApiByName(name2, quantity);
        videogames = videogames.map((game) => {
            const { id, name, background_image, genres, rating } = game;
            const obj = {
                id,
                name,
                background_image,
                genres: genres.map((g) => g.name),
                rating,
            };
            return obj;
        });

        nameDb = nameDb.map((game) => {
            const { id, name, image, genres, rating } = game;
            const obj = {
                id,
                name,
                image,
                genres: genres.map((g) => g.name),
                rating,
            };
            return obj;
        });

        videogames = [...nameDb, ...videogames];

        if (!videogames.length) videogames.push('Error');
        return res.status(200).send(videogames);
    }
    const allVideogames = [...apiInfo, ...dbInfo];
    return res.status(200).send(allVideogames);
};

const postVideogame = async (req, res) => {
    try {
        const {
            name,
            description,
            released,
            rating,
            platforms,
            genres,
            background_image,
        } = req.body;
        const validator =
            name && description && released && rating && platforms
                ? true
                : false;

        if (!validator) return res.status(400).send('Faltan campos');
        const newVideoGame = await Videogame.create({
            name,
            description,
            released,
            rating,
            platforms,
            background_image,
            createdInDB: true,
        });

        // a los generos que me llegan por body los busco en la base de datos
        const genresDb = await Genre.findAll({
            where: {
                name: genres.map((g) => g),
            },
        });
        // le asigno los generos a la nueva videojuego
        newVideoGame.addGenres(genresDb);
        return res.status(200).send('Juego creado');
    } catch (error) {
        throw new Error(`Error en crear el videojuego ${error}`);
    }
};

module.exports = {
    getAllVideoGames,
    getVideogameById,
    postVideogame,
};
/* 
ejemplo post videojuego
    {
        "name": "The Legend of Zelda: Breath of the Wild",
        "description": "aa",
        "released": "2017-03-03",
        "rating": 5,
        "platforms": [ "PC", "PlayStation 4", "Xbox One", "Nintendo Switch" ],
        "genres": [ "Action", "Adventure", "RPG" ],
        "background_image": "http://t1.gstatic.com/images?q=tbn:ANd9GcR0AffgWu7JMC9EehnQRpXNFpe-6TtuNojNthUyUhYSaD2JdPmW"
    }
*/
