const User = require("../models/User.js");
const LeaderBoard = require("../models/LeaderBoard.js");
const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");

router.get('/', protect,async (req, res) => {
  try{
    const exsitUser = await LeaderBoard.findOne({ userId: req.user._id });
    
    if (!exsitUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(exsitUser);
  }catch(error){
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;