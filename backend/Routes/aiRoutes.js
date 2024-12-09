// routes/AiRoutes.js
const express = require('express');
const router = express.Router();
const { generateOutfitSuggestion } = require('../Controllers/AiController');

router.post('/suggest-outfit', generateOutfitSuggestion);

module.exports = router;