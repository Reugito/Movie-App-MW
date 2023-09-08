const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');



const showSchema = new mongoose.Schema({
  id: Number,
  theatre: {
    name: String,
    city: String,
  },
  language: String,
  show_timing: Date,
  available_seats: Number,
  unit_price: Number,
});

const MovieSchema = mongoose.Schema({
  title: String,
  published: Boolean,
  released: Boolean,
  poster_url: String,
  release_date: String,
  publish_date: String,
  artists: [Object],
  genres: [String],
  duration: Number,
  critic_rating: Number,
  trailer_url: String,
  wiki_url: String,
  story_line: String,
  shows: [
    showSchema
  ],
});

autoIncrement.initialize(mongoose.connection);
// Add the auto-increment plugin to the schema
MovieSchema.plugin(autoIncrement.plugin, { model: 'Movie', field: 'movieid', startAt: 1 });

module.exports = mongoose.model('Movie', MovieSchema);
