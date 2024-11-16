const {check} = require('express-validator');

const insertUserPrefValidator = [
    check('user_id').notEmpty().withMessage('User ID is required'),
    check('preferred_style').notEmpty().withMessage('Preferred style is required'),
    check('favorite_colors').notEmpty().withMessage('Favorite colors are required'),
    check('preferred_fit').notEmpty().withMessage('Preferred fit is required'),
    check('weather_sensitivity').notEmpty().withMessage('Weather sensitivity is required'),
];

const updateUserPrefValidator = [
    check('preferred_style').notEmpty().withMessage('Preferred style is required'),
    check('favorite_colors').notEmpty().withMessage('Favorite colors are required'),
    check('preferred_fit').notEmpty().withMessage('Preferred fit is required'),
    check('weather_sensitivity').notEmpty().withMessage('Weather sensitivity is required'),
];

module.exports = {
    insertUserPrefValidator,
    updateUserPrefValidator,
};