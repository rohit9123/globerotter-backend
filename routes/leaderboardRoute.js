// Get top 10 players by score
const LeaderBoard = require("../models/LeaderBoard.js");
const express = require("express");
const router = express.Router();

router.get('/top-scores', async (req, res) => {
  try {
    const users = await LeaderBoard.find()
      .sort({ score: -1 }) // Sort by score in descending order
      .limit(10) // Limit to top 10 users
      .select('username score'); // Include only username and score

    res.json(users);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get top 10 players by correct answers
router.get('/most-correct', async (req, res) => {
  try {
    const users = await LeaderBoard.find()
      .sort({ correctAnswers: -1 }) // Sort by correctAnswers in descending order
      .limit(10) // Limit to top 10 users
      .select('username correctAnswers'); // Include only username and correctAnswers

    res.json(users);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get top 10 players by wrong answers
router.get('/most-wrong', async (req, res) => {
  try {
    const users = await LeaderBoard.find()
      .sort({ wrongAnswers: -1 }) // Sort by wrongAnswers in descending order
      .limit(10) // Limit to top 10 users
      .select('username wrongAnswers'); // Include only username and wrongAnswers

    res.json(users);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;