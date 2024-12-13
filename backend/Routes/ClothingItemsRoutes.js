const express = require("express");
const router = express.Router();
const cache = require("../Middleware/cacheMiddleware");
const { invalidateCache } = require("../util/cacheHelper");
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

/**
@swagger
 * /clothingitems:
 *   post:
 *     summary: Create a new clothing item
 *     tags: [Clothing Items]
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
 *               - category_name
 *               - color
 *               - season
 *               - image
 *             properties:
 *               user_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               category_name:
 *                 type: string
 *               color:
 *                 type: string
 *               season:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Item created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 *
 * /clothingitems/user/{user_id}:
 *   get:
 *     summary: Get all clothing items for a user
 *     tags: [Clothing Items]
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
 *         description: List of user's clothing items
 *       404:
 *         description: No items found
 *
 * /clothingitems/{id}:
 *   get:
 *     summary: Get clothing item by ID
 *     tags: [Clothing Items]
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
 *         description: Item details retrieved successfully
 *       404:
 *         description: Item not found
 *   
 *   put:
 *     summary: Update a clothing item
 *     tags: [Clothing Items]
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
 *               category_name:
 *                 type: string
 *               color:
 *                 type: string
 *               season:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Item updated successfully
 *       404:
 *         description: Item not found
 *   
 *   delete:
 *     summary: Delete a clothing item
 *     tags: [Clothing Items]
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
 *         description: Item deleted successfully
 *       404:
 *         description: Item not found
 *
 * /clothingitems/category/{user_id}/{category_name}:
 *   get:
 *     summary: Get clothing items by category
 *     tags: [Clothing Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: category_name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Items retrieved successfully
 *       404:
 *         description: No items found
 *
 * /clothingitems/season/{user_id}/{season}:
 *   get:
 *     summary: Get clothing items by season
 *     tags: [Clothing Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: season
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Items retrieved successfully
 *       404:
 *         description: No items found
 *
 * /clothingitems/color/{user_id}/{color}:
 *   get:
 *     summary: Get clothing items by color
 *     tags: [Clothing Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: color
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Items retrieved successfully
 *       404:
 *         description: No items found
 */

// Define the routes for the ClothingItems endpoints
router.post('/', upload.single('image'), removeBackground, insertClothingItemValidator, async (req, res, next) => {
    try {
        await createItemController(req, res);
        // Invalidate all related caches
        await invalidateCache([
            `/clothingitems/user/${req.body.user_id}`,
            `/clothingitems/category/${req.body.user_id}/*`,
            `/clothingitems/season/${req.body.user_id}/*`,
            `/clothingitems/color/${req.body.user_id}/*`
        ]);
    } catch (error) {
        next(error);
    }
});

router.get("/user/:user_id", cache(1800), getAllItemsByUserIdController);
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
