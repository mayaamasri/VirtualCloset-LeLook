// src/Services/AiService.js
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const generateOutfitSuggestion = async (items, preferences, weather, occasion) => {
  try {
    const availableIds = items.map(item => item.item_id);
    const itemsList = items.map(item => 
      `Item ID${item.item_id}: ${item.name} - ${item.color} ${item.category_name} (${item.season})`
    ).join('\n');

    const prompt = `As an expert fashion stylist, create a cohesive, ${preferences.preferred_style.toLowerCase()}-inspired outfit for a ${weather.toLowerCase()} ${occasion.toLowerCase()} day.

    Available Items (use these specific IDs only: ${availableIds.join(', ')}):
    ${itemsList}

    Style Guidelines:
    - Core Style: ${preferences.preferred_style}
    - Preferred Fit: ${preferences.preferred_fit}
    - Favorite Colors: ${preferences.favorite_colors.join(', ')}

    Context:
    - Weather: ${weather}
    - Occasion: ${occasion}
    - Season-appropriate styling is essential

    Return a JSON object with:
    {
      "selected_item_ids": [ONLY use IDs from: ${availableIds.join(', ')}],
      "description": "Create a natural description",
      "styling_tips": "Provide natural styling advice",
      "weather_notes": "Provide weather advice"
    }

    Remember to describe the outfit in a natural, conversational way without using ID numbers in the text descriptions.`;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a skilled personal stylist who specializes in creating ${preferences.preferred_style} looks. Focus on creating outfits that are both stylish and practical, with detailed styling instructions and weather-appropriate combinations. Only use items from the provided list - no hypothetical pieces.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" }
    });

    const response = JSON.parse(completion.choices[0].message.content);
    
    // Validate selected item IDs against available IDs
    const selectedItems = response.selected_item_ids
      .map(id => {
        if (!availableIds.includes(Number(id))) {
          console.warn(`Invalid item ID ${id}. Available IDs are: ${availableIds.join(', ')}`);
          return null;
        }
        return items.find(item => item.item_id === Number(id));
      })
      .filter(Boolean);

    if (selectedItems.length === 0) {
      throw new Error(`No valid items selected. Available IDs are: ${availableIds.join(', ')}`);
    }

    return {
      description: response.description,
      selected_items: selectedItems,
      styling_tips: response.styling_tips,
      weather_notes: response.weather_notes
    };

  } catch (error) {
    console.error('Error in AI service:', error);
    throw new Error('Failed to generate outfit suggestion: ' + error.message);
  }
};

module.exports = {
  generateOutfitSuggestion
};