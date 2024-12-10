// src/Controllers/AiController.js
const AiService = require('../Services/AiService');

const generateOutfitSuggestion = async (req, res) => {
  try {
    console.log('Received request body:', req.body);

    const { items, preferences, weather, occasion } = req.body;

    if (!items || !preferences || !weather || !occasion) {
      console.log('Missing required fields:', { items, preferences, weather, occasion });
      return res.status(400).json({
        error: 'Missing required parameters',
        received: { items, preferences, weather, occasion }
      });
    }

    console.log('Generating suggestion with params:', {
      itemsCount: items.length,
      preferences,
      weather,
      occasion
    });

    const suggestion = await AiService.generateOutfitSuggestion(
      items,
      preferences,
      weather,
      occasion
    );

    console.log('Generated suggestion:', suggestion);

    if (!suggestion) {
      return res.status(500).json({
        error: 'No suggestion generated'
      });
    }

    res.status(200).json(suggestion);
  } catch (error) {
    console.error('Error in AI controller:', error);
    res.status(500).json({
      error: 'Failed to generate outfit suggestion',
      details: error.message
    });
  }
};

const analyzeClothingImage = async (req, res) => {
  try {
    const { imageData } = req.body;

    if (!imageData) {
      return res.status(400).json({
        error: 'No image data provided'
      });
    }

    // Log the first few characters of the image data for debugging
    console.log('Received image data preview:', imageData.substring(0, 50) + '...');

    const analysis = await AiService.analyzeClothingImage(imageData);
    
    console.log('Analysis completed successfully:', analysis);

    res.status(200).json(analysis);
  } catch (error) {
    console.error('Error in AI controller:', error);
    res.status(500).json({
      error: 'Failed to analyze clothing image',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

module.exports = {
  generateOutfitSuggestion,
  analyzeClothingImage
};