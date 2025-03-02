const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  id: Number,
  clues: [String],
  options: [String],
  correct: String,
  fact: String
});

module.exports = mongoose.model('Question', questionSchema);