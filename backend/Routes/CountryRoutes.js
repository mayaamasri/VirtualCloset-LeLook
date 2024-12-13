const express = require("express");
const router = express.Router();
const cache = require('../Middleware/cacheMiddleware')
const {
  getAllCountriesController,
} = require("../Controllers/CountryController");

/**
 *  @swagger
 * /countries:
 *   get:
 *     summary: Get all countries
 *     tags: [Countries]
 *     responses:
 *       200:
 *         description: List of all countries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   country_id:
 *                     type: integer
 *                   country_name:
 *                     type: string
 *       500:
 *         description: Server error
 */

// Define the routes for the Country endpoints
router.get("/", cache(86400), getAllCountriesController);

module.exports = router;
