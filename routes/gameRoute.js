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
    // Validate request
    if (!req.body.id || !req.body.answer) {
      return res.status(400).json({ 
        success: false,
        message: 'Missing question ID or answer' 
      });
    }

    // Find question
    const question = await Question.findById(req.body.id);
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    // Validate answer
    const isCorrect = question.correctAnswer === req.body.answer;
    
    res.json({
      success: true,
      correct: isCorrect,
      fact: question.fact
    });

  } catch (error) {
    console.error('Check answer error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during answer verification',
      error: process.env.NODE_ENV === 'production' ? undefined : error.message
    });
  }
});




module.exports = router;