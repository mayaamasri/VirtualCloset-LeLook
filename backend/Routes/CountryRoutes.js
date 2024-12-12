const express = require("express");
const router = express.Router();
const {
  getAllCountriesController,
} = require("../Controllers/CountryController");

// Define the routes for the Country endpoints
router.get("/", getAllCountriesController);

module.exports = router;
