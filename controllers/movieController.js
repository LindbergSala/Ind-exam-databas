const Movie = require('../models/movie');

// Lägg till en ny film
exports.createMovie = async (req, res) => {
  try {
    const { title, director, releaseYear, genre } = req.body;
    const movie = new Movie({ title, director, releaseYear, genre });
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Hämta alla filmer
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Hämta detaljer för en specifik film
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Film hittades inte' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Uppdatera en film
exports.updateMovie = async (req, res) => {
  try {
    const { title, director, releaseYear, genre } = req.body;
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { title, director, releaseYear, genre },
      { new: true }
    );
    if (!movie) return res.status(404).json({ error: 'Film hittades inte' });
    res.json(movie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Ta bort en film
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Film hittades inte' });
    res.json({ message: 'Film borttagen' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
