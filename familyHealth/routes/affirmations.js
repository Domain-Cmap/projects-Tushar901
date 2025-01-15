const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const affirmationsPath = path.join(__dirname, "../data/affirmations.json");

// Get random affirmation
router.get("/random", (req, res) => {
  const affirmations = JSON.parse(fs.readFileSync(affirmationsPath));
  const randomAffirmation =
    affirmations[Math.floor(Math.random() * affirmations.length)];
  res.json({ affirmation: randomAffirmation });
});

module.exports = router;
