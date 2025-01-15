// const { readMoods } = require("./routes/mood"); // Adjust path as needed
const fs = require("fs").promises;
const path = require("path");

const moodFilePath = path.join(__dirname, "./data/moods.json");

// Read moods file
const readMoods = async () => {
  try {
    await fs.access(moodFilePath); // Check if file exists
  } catch {
    await fs.writeFile(moodFilePath, JSON.stringify([])); // Create file if not exists
  }

  try {
    const fileContent = await fs.readFile(moodFilePath, "utf-8");
    console.log("Mood file path:", moodFilePath);

    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading or parsing moods.json:", error);
    return [];
  }
};
(async () => {
  const moods = await readMoods();
  console.log("Moods from file:", moods);
})();

const moods = [
  { mood: "happy" },
  { mood: "sad" },
  { mood: "happy" },
  { mood: "angry" },
  { mood: "happy" },
];

const report = moods.reduce((acc, entry) => {
  acc[entry.mood] = (acc[entry.mood] || 0) + 1;
  return acc;
}, {});

console.log("Generated report:", report);
