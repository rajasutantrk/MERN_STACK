require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const Friend = require("./models/Friend"); // 👈 import model

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to Friends API 🎉");
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

// 👉 GET all friends
app.get("/friends", async (req, res) => {
  try {
    const friends = await Friend.find();
    res.json(friends);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 👉 POST friend (Thunder Client works here)
app.post("/friends", async (req, res) => {
  try {
    const newFriend = new Friend(req.body);
    const saved = await newFriend.save();
    res.status(201).json({
      message: "Friend Added 🎉",
      data: saved
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 👉 PUT update friend
app.put("/friends/:id", async (req, res) => {
  try {
    const updated = await Friend.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updated) return res.status(404).json({ message: "Friend not found ❌" });

    res.json({
      message: "Friend Updated ✏️",
      data: updated
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 👉 DELETE friend
app.delete("/friends/:id", async (req, res) => {
  try {
    const deleted = await Friend.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Friend not found ❌" });

    res.json({
      message: "Friend Deleted 🗑️",
      data: deleted
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});