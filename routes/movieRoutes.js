const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const reviewController = require('../controllers/reviewController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');


router.get('/ratings', movieController.getMoviesWithRatings);
router.get('/:id/reviews', reviewController.getReviewsByMovie);
router.get('/', movieController.getMovies);
router.get('/:id', movieController.getMovieById);
router.post('/', auth, role(['admin']), movieController.createMovie);
router.put('/:id', auth, role(['admin']), movieController.updateMovie);
router.delete('/:id', auth, role(['admin']), movieController.deleteMovie);

module.exports = router;
