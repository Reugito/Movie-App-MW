const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const MovieSchema = mongoose.Schema({
  title: String,
  published: Boolean,
  released: Boolean,
  poster_url: String,
  release_date: String,
  publish_date: String,
  artists: [{ artistid: Number, first_name: String, last_name: String, movies: [String] }],
  genres: [String],
  duration: Number,
  critic_rating: Number,
  trailer_url: String,
  wiki_url: String,
  story_line: String,
  shows: [
    {
      id: Number,
      theatre: { name: String, city: String },
      language: String,
      show_timing: String,
      available_seats: String,
      unit_price: Number,
    },
  ],
});

// Add the auto-increment plugin to the schema
MovieSchema.plugin(autoIncrement.plugin, { model: 'Movie', field: 'movieid', startAt: 1 });

module.exports = mongoose.model('Movie', MovieSchema);
