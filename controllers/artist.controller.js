const Artist = require('../models/artist.model');

// Find all artists
exports.findAllArtists = (req, res) => {
  Artist.find()
    .then((artists) => {
      res.sendSuccess({artists:artists});
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
