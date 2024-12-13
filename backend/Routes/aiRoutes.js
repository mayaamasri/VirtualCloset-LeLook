// routes/AiRoutes.js
const express = require("express");
const router = express.Router();
const {
  generateOutfitSuggestion,
  analyzeClothingImage,
} = require("../Controllers/AiController");

/**
 * @swagger
 * tags:
 *   - name: AI
 *     description: AI-powered outfit suggestions and image analysis
 *   - name: Categories
 *     description: Clothing categories management
 *   - name: Clothing Items
 *     description: Clothing items management
 *   - name: Countries
 *     description: Countries data management
 *   - name: Outfit Items
 *     description: Management of individual items within outfits
 *   - name: Outfits
 *     description: Complete outfit management
 *   - name: User Preferences
 *     description: User style and preference settings
 *   - name: Users
 *     description: User account management and authentication
 */

/**
 * @swagger
 * /ai/suggest-outfit:
 *   post:
 *     summary: Generate AI outfit suggestions
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *               - preferences
 *               - weather
 *               - occasion
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *               preferences:
 *                 type: object
 *               weather:
 *                 type: string
 *                 enum: [sunny, cloudy, rainy, snowy]
 *               occasion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Outfit suggestion generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 description:
 *                   type: string
 *                 selected_items:
 *                   type: array
 *                 styling_tips:
 *                   type: string
 *                 weather_notes:
 *                   type: string
 *       400:
 *         description: Invalid input parameters
 *       500:
 *         description: Server error
 *
 * /ai/analyze-image:
 *   post:
 *     summary: Analyze clothing image using AI
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - imageData
 *             properties:
 *               imageData:
 *                 type: string
 *                 format: base64
 *     responses:
 *       200:
 *         description: Image analysis completed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 category_name:
 *                   type: string
 *                 color:
 *                   type: string
 *                 season:
 *                   type: string
 *       400:
 *         description: Invalid image data
 *       500:
 *         description: Server error
 */
// Define the routes for the AI endpoints
router.post("/suggest-outfit", generateOutfitSuggestion);
router.post("/analyze-image", analyzeClothingImage);

module.exports = router;
