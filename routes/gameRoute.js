const express = require('express');
const Question = require('../models/Question'); // Import the Question model
const Leaderboard = require('../models/LeaderBoard'); // Import the Leaderboard model
const router = express.Router();
const  protect = require('../middlewares/authMiddleware');
const mongoose = require('mongoose');

// Route to get 10 random questions (without answers)


router.get('/questions', protect, async (req, res) => {
  try {
    // Fisher-Yates shuffle function (pure function)
    const shuffleArray = (array) => {
      const shuffled = [...array]; // Create copy
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    // Get 10 random questions without answers
    const questions = await Question.aggregate([
      { $sample: { size: 10 } },
      { $project: { 
        clues: 1,
        options: 1,
        _id: 1 
      }}
    ]);

    // Process questions without modifying database
    const randomizedQuestions = questions.map(question => ({
      id: question._id,
      clues: question.clues, // Shuffle clues copy
      options: shuffleArray(question.options) // Shuffle options copy
    }));

    res.json(randomizedQuestions);
    
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to load questions',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
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