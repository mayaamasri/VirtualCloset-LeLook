const express = require('express');
const router = express.Router();
const {
    createUserPreferenceController,
    getUserPreferenceController,
    updateUserPreferenceController,
} = require('../Controllers/UserPrefController');

const {
    insertUserPrefValidator,
    updateUserPrefValidator,
} = require('../Validators/UserPrefValidator');

router.post('/', insertUserPrefValidator, createUserPreferenceController);
router.get('/:id', getUserPreferenceController);
router.put('/:id', updateUserPrefValidator, updateUserPreferenceController);

module.exports = router;