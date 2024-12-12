const AiService = require('../Services/AiService');

// Controller for handling AI-related requests
const generateOutfitSuggestion = async (req, res) => {
  try {
    // Log the request body for debugging
    console.log('Received request body:', req.body);

    // Extract the required parameters from the request body
    const { items, preferences, weather, occasion } = req.body;

    // Check if any required parameters are missing
    if (!items || !preferences || !weather || !occasion) {
      console.log('Missing required fields:', { items, preferences, weather, occasion });
      // Return an error response if any required parameters are missing
      return res.status(400).json({
        error: 'Missing required parameters',
        received: { items, preferences, weather, occasion }
      });
    }

    // Log the parameters for debugging
    console.log('Generating suggestion with params:', {
      itemsCount: items.length, // Number of items
      preferences,              // User preferences
      weather,                  // Weather conditions 
      occasion                  // Occasion type
    });

    // Generate an outfit suggestion based on the provided parameters
    const suggestion = await AiService.generateOutfitSuggestion(
      items,          // Clothing items
      preferences,    // User preferences
      weather,        // Weather conditions
      occasion        // Occasion type
    );

    console.log('Generated suggestion:', suggestion);

    // Check if a suggestion was generated
    if (!suggestion) {
      return res.status(500).json({
        error: 'No suggestion generated'
      });
    }

    // Return the generated suggestion
    res.status(200).json(suggestion);
  } catch (error) {
    console.error('Error in AI controller:', error);
    // Return an error response if the request fails
    res.status(500).json({
      error: 'Failed to generate outfit suggestion',
      details: error.message
    });
  }
};

// Controller for analyzing clothing images using AI
const analyzeClothingImage = async (req, res) => {
  try {
    const { imageData } = req.body;

    // Check if image data is provided
    if (!imageData) {
      // Return an error response if no image data is provided
      return res.status(400).json({
        error: 'No image data provided'
      });
    }

    // Log the first few characters of the image data for debugging
    console.log('Received image data preview:', imageData.substring(0, 50) + '...');

    // Analyze the clothing image using AI
    const analysis = await AiService.analyzeClothingImage(imageData);
    
    console.log('Analysis completed successfully:', analysis);

    // Return the analysis results
    res.status(200).json(analysis);
  } catch (error) {
    console.error('Error in AI controller:', error);
    // Return an error response if the request fails
    res.status(500).json({
      error: 'Failed to analyze clothing image',
      details: error.message,   // Include the error message
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Export the controllers for use by the router
module.exports = {
  generateOutfitSuggestion,
  analyzeClothingImage
};