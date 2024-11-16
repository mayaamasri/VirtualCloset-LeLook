const {check} = require('express-validator');

const insertClothingItemValidator = [
    check('user_id').notEmpty().withMessage('User ID is required'),
    check('name').notEmpty().withMessage('Name is required'),
    check('category').notEmpty().withMessage('Category is required'),
    check('color').notEmpty().withMessage('Color is required'),
    check('season').notEmpty().withMessage('Season is required'),
    check('image_url').notEmpty().withMessage('Image URL is required'),
];

const updateClothingItemValidator = [
    check('name').notEmpty().withMessage('Name is required'),
    check('category').notEmpty().withMessage('Category is required'),
    check('color').notEmpty().withMessage('Color is required'),
    check('season').notEmpty().withMessage('Season is required'),
    check('image_url').notEmpty().withMessage('Image URL is required'),
];

module.exports = {
    insertClothingItemValidator,
    updateClothingItemValidator,
};