const express = require('express');
const router = express.Router();
const authenticateToken = require('../Middleware/AuthToken');
const authenticateUserController = require('../Controllers/UserAuthCont');

const {
    createUserController,
    getAllUsersController,
    getUserByIdController,
    updateUserController,
    deleteUserController,
} = require('../Controllers/UserController');

const {
    insertUserValidator,
    updateUserValidator,
} = require('../Validators/UserValidator');

router.post('/register', insertUserValidator, createUserController);
router.post('/login', authenticateUserController);

router.get('/', getAllUsersController);
router.get('/:id', authenticateToken, getUserByIdController);

router.put('/:id', authenticateToken, updateUserValidator, updateUserController);
router.delete('/:id', deleteUserController);

module.exports = router;