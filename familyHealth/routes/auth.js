const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const userFilePath = path.join(__dirname, "../data/users.json");

// Read users file
const readUsers = () => {
  if (!fs.existsSync(userFilePath)) {
    fs.writeFileSync(userFilePath, JSON.stringify([]));
  }
  return JSON.parse(fs.readFileSync(userFilePath));
};

// Signup route
router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  if (users.find((user) => user.username === username)) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ username, password });
  fs.writeFileSync(userFilePath, JSON.stringify(users));
  res.status(201).json({ message: "User created" });
});

// Login route
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    res.json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

module.exports = router;
