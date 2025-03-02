// import express from "express";
// import session from "express-session";
// import MongoStore from "connect-mongo";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import userRoutes from "./routes/user.js";
// import leaderboardRoutes from "./routes/leaderboard.js";

const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const auth = require("./routes/authRoute.js");
const gameRoute = require("./routes/gameRoute.js");
const leaderboardRoutes = require("./routes/leaderboardRoute.js");
const user = require('./routes/user.js')
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running....");
});


app.use(cors({
  origin: "https://globetrotter-frontend-puce.vercel.app/", // Replace with your frontend URL
  credentials: true
}));


// Session Middleware
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }, // 1-day expiration
  })
);

app.use("/api/auth", auth);
app.use('/api/game', gameRoute);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/user", user);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
