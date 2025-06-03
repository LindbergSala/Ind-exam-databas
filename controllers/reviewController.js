const Review = require('../models/review');
const Movie = require('../models/movie');

// Lägg till en ny recension
exports.createReview = async (req, res) => {
  try {
    const { movieId, rating, comment } = req.body;
    // Användare ID tas från JWT (req.user)
    const review = new Review({
      movieId,
      userId: req.user.userId,
      rating,
      comment
    });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Hämta alla recensioner
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('movieId').populate('userId', 'username');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Hämta detaljer för en specifik recension
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate('movieId').populate('userId', 'username');
    if (!review) return res.status(404).json({ error: 'Recension hittades inte' });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Uppdatera en recension (bara den som skapade recensionen)
exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: 'Recension hittades inte' });

    // Kontrollera att rätt användare eller admin
    if (review.userId.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Du får bara ändra egna recensioner' });
    }

    const { rating, comment } = req.body;
    review.rating = rating !== undefined ? rating : review.rating;
    review.comment = comment !== undefined ? comment : review.comment;
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Ta bort en recension (bara den som skapade recensionen eller admin)
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: 'Recension hittades inte' });

    if (review.userId.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Du får bara ta bort egna recensioner' });
    }

    await review.deleteOne();
    res.json({ message: 'Recension borttagen' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Hämta alla recensioner för en specifik film
exports.getReviewsByMovie = async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.params.id }).populate('userId', 'username');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
