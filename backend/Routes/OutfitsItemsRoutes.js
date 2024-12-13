const express = require("express");
const router = express.Router();

const {
  createOutfitItemController,
  getOutfitItemsByOutfitIdController,
  updateOutfitItemController,
  removeItemFromOutfitController,
} = require("../Controllers/OutfitItemController");


/**
 * @swagger
 * /outfitItems:
 *   post:
 *     summary: Add an item to an outfit
 *     tags: [Outfit Items]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OutfitItem'
 *     responses:
 *       201:
 *         description: Item added to outfit successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 * 
 * /outfitItems/{outfit_id}:
 *   get:
 *     summary: Get all items in an outfit
 *     tags: [Outfit Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: outfit_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of outfit items retrieved successfully
 *       404:
 *         description: Outfit not found
 * 
 * /outfitItems/{outfit_id}/{item_id}:
 *   put:
 *     summary: Update an item's position in an outfit
 *     tags: [Outfit Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: outfit_id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: item_id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               position:
 *                 type: object
 *               scale:
 *                 type: number
 *               position_index:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Item position updated successfully
 *       404:
 *         description: Item or outfit not found
 *
 *   delete:
 *     summary: Remove an item from an outfit
 *     tags: [Outfit Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: outfit_id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: item_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item removed successfully
 *       404:
 *         description: Item or outfit not found
 *
 */

// Define the routes for the OutfitItems endpoints
router.post("/", createOutfitItemController);

router.get("/:outfit_id", getOutfitItemsByOutfitIdController);

router.put("/:outfit_id/:item_id", updateOutfitItemController);

router.delete("/:outfit_id/:item_id", removeItemFromOutfitController);

module.exports = router;
