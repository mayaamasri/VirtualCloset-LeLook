const OpenAI = require("openai");
require("dotenv").config();

// Initialize the OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Generate an outfit suggestion based on the provided items, preferences, weather, and occasion
const generateOutfitSuggestion = async (
  items,
  preferences,
  weather,
  occasion
) => {
  try {
    // Extract the available item IDs and generate a prompt for the AI
    const availableIds = items.map((item) => item.item_id);
    const itemsList = items
      .map(
        (item) =>
          `Item ID${item.item_id}: ${item.name} - ${item.color} ${item.category_name} (${item.season})`
      )
      .join("\n");

    // Define the prompt for the AI to generate an outfit suggestion
    const prompt = `As an expert fashion stylist, create a cohesive, ${preferences.preferred_style.toLowerCase()}-inspired outfit for a ${weather.toLowerCase()} ${occasion.toLowerCase()} day.

    Available Items (use these specific IDs only: ${availableIds.join(", ")}):
    ${itemsList}

    Style Guidelines:
    - Core Style: ${preferences.preferred_style}
    - Preferred Fit: ${preferences.preferred_fit}
    - Favorite Colors: ${preferences.favorite_colors.join(", ")}

    Context:
    - Weather: ${weather}
    - Occasion: ${occasion}
    - Season-appropriate styling is essential
    - make sure not to mix casual and formal pieces (no heels on casual events, etc.)
    - make them color coordinated
    - no dresses with pants for example or tshirts
    - one bag per outfit

    Return a JSON object with:
    {
      "selected_item_ids": [ONLY use IDs from: ${availableIds.join(", ")}],
      "description": "Create a natural description",
      "styling_tips": "Provide natural styling advice",
      "weather_notes": "Provide weather advice"
    }

    Remember to describe the outfit in a natural, conversational way without using ID numbers in the text descriptions.`;

    // Generate the outfit suggestion using the OpenAI API
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a skilled personal stylist who specializes in creating ${preferences.preferred_style} looks. Focus on creating outfits that are both stylish and practical, with detailed styling instructions and weather-appropriate combinations. Only use items from the provided list - no hypothetical pieces.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
    });

    // Log successful response for debugging
    const response = JSON.parse(completion.choices[0].message.content);

    // Validate selected item IDs against available IDs
    const selectedItems = response.selected_item_ids
      .map((id) => {
        if (!availableIds.includes(Number(id))) {
          console.warn(
            `Invalid item ID ${id}. Available IDs are: ${availableIds.join(
              ", "
            )}`
          );
          return null;
        }
        return items.find((item) => item.item_id === Number(id));
      })
      .filter(Boolean);

    if (selectedItems.length === 0) {
      throw new Error(
        `No valid items selected. Available IDs are: ${availableIds.join(", ")}`
      );
    }

    // Return the outfit suggestion details
    return {
      description: response.description,
      selected_items: selectedItems,
      styling_tips: response.styling_tips,
      weather_notes: response.weather_notes,
    };
  } catch (error) {
    console.error("Error in AI service:", error);
    throw new Error("Failed to generate outfit suggestion: " + error.message);
  }
};

// Analyze a clothing image using the OpenAI API to identify its category, color, and season
const analyzeClothingImage = async (base64Image) => {
  try {
    // Remove the data:image/* prefix if present
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");

    // Call the OpenAI API to analyze the clothing image
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a fashion expert AI that analyzes clothing images. Provide detailed information about clothing items, including their category, color, appropriate seasons, and any notable style characteristics.",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this clothing item and provide details in JSON format with the following fields: category_name (matching one of: Dresses, Blazers, Knitwear, Sweatshirts | Hoodies, Skirts, Shorts, Joggers, T-Shirts, Jackets, Jeans, Trousers, Tops, Coats, Shoes, Bags, Accessories), color (primary color), season (Spring, Summer, Fall, Winter, or All Seasons), name (suggested name for the item).",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Data}`,
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
      response_format: { type: "json_object" },
    });

    // Log successful response for debugging
    console.log("OpenAI Analysis Result:", response.choices[0].message.content);

    const analysisResult = JSON.parse(response.choices[0].message.content);

    // Validate the response format
    if (
      !analysisResult.category_name ||
      !analysisResult.color ||
      !analysisResult.season ||
      !analysisResult.name
    ) {
      throw new Error("Incomplete analysis result from OpenAI");
    }

    return analysisResult;
  } catch (error) {
    console.error("Error analyzing image:", {
      message: error.message,
      details: error.response?.data || error,
    });
    throw error;
  }
};

module.exports = {
  generateOutfitSuggestion,
  analyzeClothingImage,
};
