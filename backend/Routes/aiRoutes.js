// routes/AiRoutes.js
const express = require("express");
const router = express.Router();
const {
  generateOutfitSuggestion,
  analyzeClothingImage,
} = require("../Controllers/AiController");

// Define the routes for the AI endpoints
router.post("/suggest-outfit", generateOutfitSuggestion);
router.post("/analyze-image", analyzeClothingImage);

module.exports = router;
