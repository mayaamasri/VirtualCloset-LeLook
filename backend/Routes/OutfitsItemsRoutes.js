const express = require("express");
const router = express.Router();

const {
  createOutfitItemController,
  getOutfitItemsByOutfitIdController,
  updateOutfitItemController,
  removeItemFromOutfitController,
} = require("../Controllers/OutfitItemController");

// Define the routes for the OutfitItems endpoints
router.post("/", createOutfitItemController);

router.get("/:outfit_id", getOutfitItemsByOutfitIdController);

router.put("/:outfit_id/:item_id", updateOutfitItemController);

router.delete("/:outfit_id/:item_id", removeItemFromOutfitController);

module.exports = router;
