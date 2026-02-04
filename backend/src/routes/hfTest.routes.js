const express = require("express");
const { callHuggingFace } = require("../services/huggingface.service");

const router = express.Router();

router.get("/hf", async (req, res) => {
  const result = await callHuggingFace(
    "Ask one React interview question"
  );
  res.json({ result });
});

module.exports = router; // 🔥 THIS LINE IS CRITICAL
