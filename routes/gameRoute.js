const express = require('express');
const Question = require('../models/Question'); // Import the Question model
const Leaderboard = require('../models/LeaderBoard'); // Import the Leaderboard model
const router = express.Router();
const  protect = require('../middlewares/authMiddleware');
const mongoose = require('mongoose');

// Route to get 10 random questions (without answers)


router.get('/questions', protect, async (req, res) => {
  try {

    // Fetch 10 random questions from the database
    console.log("fetching questions")
    const questions = await Question.aggregate([{ $sample: { size: 10 } }]);

    // Remove the correct answer before sending to the frontend
    const questionsWithoutAnswers = questions.map((question) => {
      return {
        id: question.id,
        clues: question.clues,
        options: question.options,
      };
    });

    res.json(questionsWithoutAnswers);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to check user answers
router.post('/check-answers', protect, async (req, res) => {
  try {
    const { id, answer } = req.body; // Single answer object: { id, answer }

    // Fetch the question from the database using the provided ID
    const question = await Question.findOne({ id });

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Check if the user's answer matches the correct answer
    const isCorrect = question.correct === answer;

    // Send the response immediately
    res.json({
      correct: isCorrect,
      fact: question.fact, // Include the fun fact
    });

    // Perform leaderboard update in the background
    setImmediate(async () => {
      try {
        const userId = new mongoose.Types.ObjectId(req.user._id);
        const existingLeaderboard = await Leaderboard.findOne({ userId });

        if (!existingLeaderboard) {
          await Leaderboard.create({ userId, username: req.user.username });
        }

        await Leaderboard.updateOne(
          { userId },
          {
            $inc: {
              questionsAttempted: 1,
              correctAnswers: isCorrect ? 1 : 0,
              wrongAnswers: isCorrect ? 0 : 1,
              score: isCorrect ? 10 : 0,
            },
          },
          { upsert: true }
        ).exec();
      } catch (err) {
        console.error('Error updating leaderboard:', err);
      }
    });

  } catch (error) {
    console.error('Error checking answer:', error);
    res.status(500).json({ message: 'Server error' });
  }
});




module.exports = router;