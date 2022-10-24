const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const {
    getAllVideoGames,
    getVideogameById,
    postVideogame,
} = require('../controllers/videogames.controllers');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const router = Router();

router.get('/videogames', getAllVideoGames);
router.get('/videogames/:id', getVideogameById);
router.post('/videogames', postVideogame);

module.exports = router;
