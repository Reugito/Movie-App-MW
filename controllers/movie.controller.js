const Movie = require('../models/movie.model');

// Find all movies by status
exports.findAllMovies = (req, res) => {
  const { status } = req.query;

  Movie.find({ status })
    .then((movies) => {
      res.sendSuccess(movies);
    })
    .catch((err) => {
      res.sendError(500, err.message);
    });
};

// Find a movie by its ID
exports.findOne = (req, res) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Find shows for a specific movie by its ID
exports.findShows = (req, res) => {
  const { movieId } = req.params;

  // Add logic to retrieve shows for the movie by its ID
  // You can use Movie.findById(movieId) and access the 'shows' field
  // Return the shows data as JSON
};
