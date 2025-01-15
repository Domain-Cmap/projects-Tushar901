const express = require("express");
const router = express.Router();
const Client = require("@gradio/client"); // Replace with actual client library

router.post("/chat", async (req, res) => {
  try {
    const { query, history } = req.body;
    const client = await Client.connect("Qwen/Qwen2.5-72B-Instruct");
    const result = await client.predict("/model_chat", {
      query,
      history,
      system:
        "You are Qwen, created by Aman. You are a helpful assistant. You give user with detailed movie scripts about what user asks. Keep your response detailed and structured.",
    });

    res.json({ response: result.data });
  } catch (error) {
    console.error("Error occurred:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
});

module.exports = router;
