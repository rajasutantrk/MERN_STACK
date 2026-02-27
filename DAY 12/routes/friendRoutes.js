const express = require("express");
const Friend = require("../models/Friend");

const router = express.Router();

// GET all friends
router.get("/", async (req, res) => {
  const friends = await Friend.find();
  res.json(friends);
});

// GET single friend
router.get("/:id", async (req, res) => {
  const friend = await Friend.findById(req.params.id);
  if (!friend) return res.status(404).json({ message: "Friend not found ❌" });
  res.json(friend);
});

// POST create friend
router.post("/", async (req, res) => {
  const friend = await Friend.create(req.body);
  res.status(201).json(friend);
});

// PUT update friend
router.put("/:id", async (req, res) => {
  const friend = await Friend.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(friend);
});

// DELETE friend
router.delete("/:id", async (req, res) => {
  await Friend.findByIdAndDelete(req.params.id);
  res.json({ message: "Friend deleted 🗑️" });
});

module.exports = router;
