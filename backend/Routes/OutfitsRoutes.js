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

/**
@swagger
* /outfits:
*   post:
*     summary: Create a new outfit
*     tags: [Outfits]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             required:
*               - user_id
*               - name
*               - occasion
*               - season
*             properties:
*               user_id:
*                 type: integer
*               name:
*                 type: string
*               occasion:
*                 type: string
*               season:
*                 type: string
*               image:
*                 type: string
*                 format: binary
*               items:
*                 type: string
*                 description: JSON string of outfit items
*     responses:
*       201:
*         description: Outfit created successfully
*       400:
*         description: Invalid input
*
* /outfits/{id}:
*   get:
*     summary: Get outfit by ID
*     tags: [Outfits]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: integer
*     responses:
*       200:
*         description: Outfit details retrieved successfully
*       404:
*         description: Outfit not found
*
*   put:
*     summary: Update an outfit
*     tags: [Outfits]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: integer
*     requestBody:
*       required: true
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*               occasion:
*                 type: string
*               season:
*                 type: string
*               image:
*                 type: string
*                 format: binary
*               items:
*                 type: string
*     responses:
*       200:
*         description: Outfit updated successfully
*       404:
*         description: Outfit not found
*
*   delete:
*     summary: Delete an outfit
*     tags: [Outfits]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: integer
*     responses:
*       200:
*         description: Outfit deleted successfully
*       404:
*         description: Outfit not found
*
* /outfits/user/{user_id}:
*   get:
*     summary: Get all outfits for a user
*     tags: [Outfits]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: user_id
*         required: true
*         schema:
*           type: integer
*     responses:
*       200:
*         description: List of user's outfits
*/
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
