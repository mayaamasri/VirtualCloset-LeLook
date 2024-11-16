const { check } = require('express-validator');

const insertUserValidator = [
    check('firstname').notEmpty().withMessage('First name is required'),
    check('username').notEmpty().withMessage('Username is required'),
    check('email').isEmail().withMessage('Invalid email'),
    check('email').notEmpty().withMessage('Email is required'),
    check('password').notEmpty().withMessage('Password is required'),
    check('password').isLength({ min: 8 }).withMessage('Password should be at least 8 characters'),
    check('password').isStrongPassword().withMessage('Password should contain at least 1 lowercase, 1 uppercase, 1 number and 1 special character'),
];

const updateUserValidator = [
    check('firstname').notEmpty().withMessage('First name is required'),
    check('username').notEmpty().withMessage('Username is required'),
    check('email').isEmail().withMessage('Invalid email'),
    check('email').notEmpty().withMessage('Email is required'),
    check('password').notEmpty().withMessage('Password is required'),
    check('password').isLength({ min: 8 }).withMessage('Password should be at least 8 characters'),
    check('password').isStrongPassword().withMessage('Password should contain at least 1 lowercase, 1 uppercase, 1 number and 1 special character'),
];

module.exports = {
    insertUserValidator,
    updateUserValidator,
};