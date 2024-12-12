const express = require("express");
const router = express.Router();
const {
  getAllCategoriesController,
} = require("../Controllers/CategoryController");

// Define the routes for the Category endpoints
router.get("/", getAllCategoriesController);

module.exports = router;
