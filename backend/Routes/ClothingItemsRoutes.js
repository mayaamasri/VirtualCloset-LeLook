const express = require("express");
const router = express.Router();
const upload = require("../Middleware/uploadMiddleWare");
const removeBackground = require("../Middleware/backgroundRemoval");

const {
  createItemController,
  getAllItemsByUserIdController,
  getItemByIdController,
  getItemByCategoryController,
  getItemBySeasonController,
  getItemByColorController,
  updateItemController,
  deleteItemController,
} = require("../Controllers/ClothingItemsController");

const {
  insertClothingItemValidator,
  updateClothingItemValidator,
} = require("../Validators/ClothingItemsValidator");

// Define the routes for the ClothingItems endpoints
router.post(
  "/",
  upload.single("image"),
  removeBackground,
  insertClothingItemValidator,
  createItemController
);

router.get("/user/:user_id", getAllItemsByUserIdController);
router.get("/:id", getItemByIdController);
router.get("/category/:user_id/:category_name", getItemByCategoryController);
router.get("/season/:user_id/:season", getItemBySeasonController);
router.get("/color/:user_id/:color", getItemByColorController);

router.put(
  "/:id",
  upload.single("image"),
  removeBackground,
  updateClothingItemValidator,
  updateItemController
);

router.delete("/:id", deleteItemController);

module.exports = router;
