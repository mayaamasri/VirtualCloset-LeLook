const express = require('express');
const router = express.Router();
const {getAllCountriesController} = require('../Controllers/CountryController');

router.get('/', getAllCountriesController);

module.exports = router;