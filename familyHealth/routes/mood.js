const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");

const moodFilePath = path.join(__dirname, "../data/moods.json");

// Read moods file
// Ensure readMoods is returning a Promise
const readMoods = async () => {
  try {
    await fs.access(moodFilePath);
  } catch {
    await fs.writeFile(moodFilePath, JSON.stringify([]));
  }

  try {
    const fileContent = await fs.readFile(moodFilePath, "utf-8");
    const moods = JSON.parse(fileContent);

    // Filter out invalid entries
    const validMoods = moods.filter((entry) => entry.mood);
    return validMoods;
  } catch (error) {
    console.error("Error reading or parsing moods.json:", error);
    return [];
  }
};

// Add mood entry
router.post("/add", (req, res) => {
  const { username, mood } = req.body;

  readMoods().then((moods) => {
    moods.push({ username, mood, date: new Date().toISOString() });

    fs.writeFile(moodFilePath, JSON.stringify(moods)) // Use promises to write back the file
      .then(() => {
        res.status(201).json({ message: `Mood logged successfully!` });
      })
      .catch((error) => {
        console.error("Error writing mood to file:", error);
        res.status(500).send("Internal Server Error");
      });
  });
});

// Get mood entries for a specific username
// router.get("/:username", (req, res) => {
//   const { username } = req.params;

//   readMoods().then((moods) => {
//     const userMoods = moods.filter((entry) => entry.username === username);
//     res.json(userMoods);
//   });
// });

// Get mood report
router.get("/report", async (req, res) => {
  try {
    const moods = await readMoods();

    const report = {};
    for (const entry of moods) {
      if (!entry.mood) {
        console.error("Invalid mood entry:", entry); // Log problematic entries
        continue;
      }
      report[entry.mood] = (report[entry.mood] || 0) + 1;
    }
    res.json(report);
  } catch (error) {
    console.error("Error processing the report:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
