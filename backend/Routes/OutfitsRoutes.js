const express = require("express");
const router = express.Router();
const upload = require("../Middleware/uploadMiddleWare");

const {
  createOutfitController,
  getOutfitByIdController,
  getOutfitsByUserIdController,
  getOutfitBySeasonController,
  getOutfitByOccasionController,
  updateOutfitController,
  deleteOutfitController,
} = require("../Controllers/OutfitsController");

const {
  insertOutfitValidator,
  updateOutfitValidator,
} = require("../Validators/OutfitsValidator");

router.post(
  "/",
  upload.single("image"),
  (req, res, next) => {
    if (req.body.items && typeof req.body.items === "string") {
      try {
        req.body.items = JSON.parse(req.body.items);
      } catch (e) {
        return res.status(400).json({ error: "Invalid items data" });
      }
    }
    next();
  },
  insertOutfitValidator,
  createOutfitController
);

router.get("/:id", getOutfitByIdController);
router.get("/user/:user_id", getOutfitsByUserIdController);
router.get("/season/:user_id/:season", getOutfitBySeasonController);
router.get("/occasion/:user_id/:occasion", getOutfitByOccasionController);

router.put(
  "/:id",
  upload.single("image"),
  updateOutfitValidator,
  updateOutfitController
);

router.delete("/:id", deleteOutfitController);

module.exports = router;
