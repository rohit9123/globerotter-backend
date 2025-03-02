const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const { generateToken } = require("../utils/generateToken.js");


const router = express.Router();

// Register User
router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });
    if (existingUsername) return res.status(400).json({ message: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword });
    const user = { username: newUser.username, email: newUser.email, _id: newUser._id };

    const token = generateToken(res, newUser._id);
    console.log(newUser);
    res.status(201).json({ message: "User registered successfully", user,token});
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message });
  }
});

// Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(res, user._id);
    res.status(200).json({ message: "Login successful", user: { username: user.username, email: user.email, _id: user._id },token});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Logout User
router.post("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Logged out successfully" });
});

// Get Current User
router.get("/me", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ isAuthenticated: true, userId: decoded.userId });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;
