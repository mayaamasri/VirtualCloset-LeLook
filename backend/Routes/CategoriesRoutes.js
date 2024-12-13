const express = require("express");
const router = express.Router();
const cache = require('../Middleware/cacheMiddleware')
const {
  getAllCategoriesController,
} = require("../Controllers/CategoryController");

/**
* @swagger
 * /categories:
 *   get:
 *     summary: Get all clothing categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   category_id:
 *                     type: integer
 *                   category_name:
 *                     type: string
 *       500:
 *         description: Server error
 */

// Define the routes for the Category endpoints
router.get("/", cache(86400), getAllCategoriesController);

module.exports = router;
