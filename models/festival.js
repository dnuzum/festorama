var mongoose = require('mongoose');

var FestivalSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: String,
  photo: String,
  url: String
});

module.exports = mongoose.model('Festival', FestivalSchema);
