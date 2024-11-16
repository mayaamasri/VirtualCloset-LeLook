const express = require('express');
const router = express.Router();

const {
    createOutfitItemController,
    getOutfitItemsByOutfitIdController,
    updateOutfitItemController,
    removeItemFromOutfitController
} = require('../Controllers/OutfitItemController');

router.post('/', createOutfitItemController);

router.get('/:outfit_id', getOutfitItemsByOutfitIdController);

router.put('/:outfit_id/:item_id', updateOutfitItemController);

router.delete('/:outfit_id/:item_id', removeItemFromOutfitController);

module.exports = router;