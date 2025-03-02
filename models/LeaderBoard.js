// models/Leaderboard.js
const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  username: { type: String },
  score: { type: Number, default: 0 },
  questionsAttempted: { type: Number, default: 0 },
  correctAnswers: { type: Number, default: 0 },
  wrongAnswers: { type: Number, default: 0 },
});

// Create indexes for fast sorting
leaderboardSchema.index({ score: -1 }); // Index for highest scores
leaderboardSchema.index({ correctAnswers: -1 }); // Index for most correct answers
leaderboardSchema.index({ questionsAttempted: -1 }); // Index for most attempts

module.exports = mongoose.model('Leaderboard', leaderboardSchema);