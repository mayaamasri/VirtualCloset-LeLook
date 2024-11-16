const {check} = require('express-validator');

const insertOutfitValidator = [
    check('user_id').notEmpty().withMessage('User ID is required'),
    check('name').notEmpty().withMessage('Name is required'),
    check('occasion').notEmpty().withMessage('Occasion is required'),
    check('season').notEmpty().withMessage('Season is required')
];

const updateOutfitValidator = [
    check('name').notEmpty().withMessage('Name is required'),
    check('occasion').notEmpty().withMessage('Occasion is required'),
    check('season').notEmpty().withMessage('Season is required')
];

module.exports = {
    insertOutfitValidator,
    updateOutfitValidator,
};