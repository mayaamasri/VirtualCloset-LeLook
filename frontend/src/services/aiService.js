// src/services/aiService.js
import http from "../http-common";

const generateOutfitSuggestion = async (params) => {
  try {
    console.log('Sending request with params:', params);
    
    const response = await http.post("/ai/suggest-outfit", params);
    
    console.log('Received response:', response.data);
    
    // Validate response data
    if (!response.data) {
      throw new Error('No data received from server');
    }

    return {
      description: response.data.description || 'No outfit description available',
      selected_items: response.data.selected_items || [],
      styling_tips: response.data.styling_tips || 'No styling tips available',
      weather_notes: response.data.weather_notes || 'No weather considerations available'
    };
  } catch (error) {
    console.error("Error generating outfit suggestion:", error);
    console.error("Response:", error.response?.data);
    throw error;
  }
};

const analyzeClothingImage = async (file) => {
  try {
    // Convert File to base64
    const base64Image = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    // Log the first few characters of the base64 string for debugging
    console.log('Base64 image preview:', base64Image.substring(0, 50) + '...');

    const response = await http.post("/ai/analyze-image", {
      imageData: base64Image
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error analyzing image:", {
      message: error.message,
      response: error.response?.data
    });
    throw error;
  }
}

const AiService = {
  generateOutfitSuggestion,
  analyzeClothingImage
};

export default AiService;