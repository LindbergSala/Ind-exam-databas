const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

// Alla får läsa filmer
router.get('/ratings', movieController.getMoviesWithRatings);
router.get('/', movieController.getMovies);
router.get('/:id', movieController.getMovieById);

// Skyddade routes – endast admin
router.post('/', auth, role(['admin']), movieController.createMovie);
router.put('/:id', auth, role(['admin']), movieController.updateMovie);
router.delete('/:id', auth, role(['admin']), movieController.deleteMovie);

module.exports = router;
