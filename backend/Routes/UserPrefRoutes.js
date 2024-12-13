const express = require("express");
const router = express.Router();
const {
  createUserPreferenceController,
  getUserPreferenceController,
  updateUserPreferenceController,
} = require("../Controllers/UserPrefController");

const {
  insertUserPrefValidator,
  updateUserPrefValidator,
} = require("../Validators/UserPrefValidator");

/**
 * @swagger
 * /userpref:
 *   post:
 *     summary: Create user preferences
 *     tags: [User Preferences]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserPreference'
 *     responses:
 *       201:
 *         description: Preferences created successfully
 *       400:
 *         description: Invalid input
 *
 * /userpref/{id}:
 *   get:
 *     summary: Get user preferences
 *     tags: [User Preferences]
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
 *         description: Preferences retrieved successfully
 *       404:
 *         description: Preferences not found
 *
 *   put:
 *     summary: Update user preferences
 *     tags: [User Preferences]
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
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserPreference'
 *     responses:
 *       200:
 *         description: Preferences updated successfully
 *       404:
 *         description: Preferences not found
 */

// Define the routes for the User Preference endpoints
router.post("/", insertUserPrefValidator, createUserPreferenceController);
router.get("/:id", getUserPreferenceController);
router.put("/:id", updateUserPrefValidator, updateUserPreferenceController);

module.exports = router;
