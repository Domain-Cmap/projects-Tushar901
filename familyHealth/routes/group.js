const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const groupFilePath = path.join(__dirname, "../data/groups.json");

// Read groups file
const readGroups = () => {
  if (!fs.existsSync(groupFilePath)) {
    fs.writeFileSync(groupFilePath, JSON.stringify([]));
  }
  return JSON.parse(fs.readFileSync(groupFilePath));
};

// Create a group
router.post("/create", (req, res) => {
  const { groupName, username } = req.body;
  const groups = readGroups();

  if (groups.find((group) => group.name === groupName)) {
    return res.status(400).json({ message: "Group already exists" });
  }

  groups.push({ name: groupName, members: [username] });
  fs.writeFileSync(groupFilePath, JSON.stringify(groups));
  res.status(201).json({ message: "Group created" });
});

// Join a group
router.post("/join", (req, res) => {
  const { groupName, username } = req.body;
  const groups = readGroups();

  const group = groups.find((group) => group.name === groupName);
  if (!group) {
    return res.status(404).json({ message: "Group not found" });
  }

  if (!group.members.includes(username)) {
    group.members.push(username);
    fs.writeFileSync(groupFilePath, JSON.stringify(groups));
  }
  res.json({ message: "Joined group" });
});

module.exports = router;
