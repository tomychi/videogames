const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const { Videogame, Genre } = require('../db');

const {
    getAllVideoGames,
    getVideogameById,
} = require('../controllers/videogames.js');
const { getApiGenres } = require('../controllers/genres.js');
const { getPlatforms } = require('../controllers/platforms.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', async (req, res) => {
    console.log('consultando api');
    const name = req.query.name;
    const allVideoGames = await getAllVideoGames();

    if (name) {
        const videogameName = allVideoGames.filter((e) =>
            e.name.toLowerCase().includes(name.toLowerCase())
        );

        if (videogameName.length) {
            return res.status(200).send(videogameName);
        }
        return res.status(404).send('No se encontro el juego');
    }

    return res.status(200).send(allVideoGames);
});

router.get('/videogames/:id', getVideogameById);

router.post('/videogames', async (req, res) => {
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
        name && description && released && rating && platforms ? true : false;

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
    console.log(newVideoGame);
    return res.status(200).send('Juego creado');
});

router.get('/genres', async (req, res) => {
    const allGenres = await getApiGenres();

    return res.status(200).send(allGenres);
});

router.get('/platforms', async (req, res) => {
    const allPlatforms = await getPlatforms();

    return res.status(200).send(allPlatforms);
});

module.exports = router;
/* {
    
    "name": "The Legend of Zelda: Breath of the Wild",
    "description": "aa",
    "released": "2017-03-03",
    "rating": 5,
    "platforms": [ "PC", "PlayStation 4", "Xbox One", "Nintendo Switch" ],
    "genres": [ "Action", "Adventure", "RPG" ],
    "background_image": "http://t1.gstatic.com/images?q=tbn:ANd9GcR0AffgWu7JMC9EehnQRpXNFpe-6TtuNojNthUyUhYSaD2JdPmW"
    }
*/
