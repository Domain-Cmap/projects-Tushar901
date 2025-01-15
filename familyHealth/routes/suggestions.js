const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const suggestionsPath = path.join(__dirname, "../data/suggestions.json");

// Get suggestions based on mood
router.get("/:mood", (req, res) => {
  const { mood } = req.params;
  const suggestions = JSON.parse(fs.readFileSync(suggestionsPath));

  if (suggestions[mood]) {
    res.json({ suggestions: suggestions[mood] });
  } else {
    res.status(404).json({ message: "No suggestions found for this mood" });
  }
});

module.exports = router;
