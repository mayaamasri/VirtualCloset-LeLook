const express = require('express');
const router = express.Router();
const {getAllCategoriesController} = require('../Controllers/CategoryController');

router.get('/', getAllCategoriesController);

module.exports = router;