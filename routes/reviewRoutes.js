const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const auth = require('../middleware/auth');

// Alla kan läsa recensioner och hämta alla för en film
router.get('/', reviewController.getReviews);
router.get('/:id', reviewController.getReviewById);
router.get('/movie/:id', reviewController.getReviewsByMovie); // alt: flytta till movieRoutes som GET /movies/:id/reviews

// Endast inloggade kan skapa, ändra och ta bort egna recensioner
router.post('/', auth, reviewController.createReview);
router.put('/:id', auth, reviewController.updateReview);
router.delete('/:id', auth, reviewController.deleteReview);

module.exports = router;
