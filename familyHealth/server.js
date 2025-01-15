const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes
const authRoutes = require("./routes/auth");
const moodRoutes = require("./routes/mood");
const affirmationRoutes = require("./routes/affirmations");
const groupRoutes = require("./routes/group");
const suggestionRoutes = require("./routes/suggestions");

app.use("/suggestions", suggestionRoutes);
app.use("/group", groupRoutes);
app.use("/affirmations", affirmationRoutes);
app.use("/auth", authRoutes);
app.use("/mood", moodRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
