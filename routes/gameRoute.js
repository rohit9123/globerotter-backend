const express = require('express');
const Question = require('../models/Question'); // Import the Question model
const Leaderboard = require('../models/LeaderBoard'); // Import the Leaderboard model
const router = express.Router();
const  protect = require('../middlewares/authMiddleware');
const mongoose = require('mongoose');

// Route to get 10 random questions (without answers)


router.get('/questions', protect, async (req, res) => {
  try {
    // ✅ Get the number of questions from query (default to 10 if not provided)
    const noOfQuestions =  10;

    // ✅ Shuffle helper function
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
      }
      return array;
    };

    // ✅ Use MongoDB $sample to get random questions
    const questions = await Question.aggregate([
      { $sample: { size: noOfQuestions } }
    ]);

    // ✅ Process questions with shuffled options (keep clues as-is or shuffle if needed)
    const questionsWithoutAnswers = questions.map((question) => ({
      id: question._id,
      clues: question.clues, // Optional: shuffle clues too if needed
      options: shuffleArray(question.options)
    }));

    res.json(questionsWithoutAnswers);

  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({
      message: 'Error fetching questions',
      error: error.message
    });
  }
});


// Route to check user answers
router.post('/check-answers', protect, async (req, res) => {
  try {
    let { id, answer } = req.body; // Single answer object: { id, answer }
    

    // Fetch the question from the database using the provided ID

    const question = await Question.findById(id);

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