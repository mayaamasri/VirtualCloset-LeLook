// routes/AiRoutes.js
const express = require('express');
const router = express.Router();
const { generateOutfitSuggestion, analyzeClothingImage } = require('../Controllers/AiController');

router.post('/suggest-outfit', generateOutfitSuggestion);
router.post('/analyze-image', analyzeClothingImage);

module.exports = router;