const OutfitItems = require("../Models/OutfitItems");

// Create a new outfit item
const createOutfitItem = async (
  outfit_id,
  item_id,
  position,
  scale,
  position_index
) => {
  try {
    // Ensure position is properly formatted
    const formattedPosition =
      typeof position === "string" ? JSON.parse(position) : position;

    // Create the outfit item
    const outfitItem = await OutfitItems.create({
      outfit_id,
      item_id,
      position: formattedPosition, // Now storing as JSON
      scale,
      position_index,
    });
    return outfitItem;
  } catch (err) {
    console.error("Error creating outfit item:", err);
    throw new Error("Failed to create outfit item");
  }
};

// Get all outfit items for a given outfit
const getOutfitItemsByOutfitId = async (outfit_id) => {
  try {
    // Get all outfit items for the outfit
    const outfitItems = await OutfitItems.findAll({
      where: { outfit_id },
      order: [["position_index", "ASC"]],
    });
    // Return the outfit items
    return outfitItems;
  } catch (err) {
    console.error("Error getting outfit items:", err);
    throw new Error("Failed to get outfit items");
  }
};

// Update an outfit item
const updateOutfitItem = async (
  outfit_id,
  item_id,
  position,
  scale,
  position_index
) => {
  try {
    // Find the outfit item
    const outfitItem = await OutfitItems.findOne({
      where: { outfit_id, item_id },
    });

    if (!outfitItem) {
      throw new Error("Outfit item not found");
    }

    // Ensure position is properly formatted
    const formattedPosition =
      typeof position === "string" ? JSON.parse(position) : position;

    const updated = await outfitItem.update({
      position: formattedPosition,
      scale,
      position_index,
    });
    return updated;
  } catch (err) {
    console.error("Error updating outfit item:", err);
    throw new Error("Failed to update outfit item");
  }
};

// Remove an item from an outfit
const removeItemFromOutfit = async (outfit_id, item_id) => {
  try {
    // Find the outfit item
    const outfitItem = await outfitItem.findOne({
      where: { outfit_id, item_id },
    });
    // Ensure the item is in the outfit
    if (!outfitItem) throw new Error("Item not found in outfit");
    await outfitItem.destroy();
    return { message: "Item removed from outfit" };
  } catch (err) {
    // Log and throw errors
    console.error("Error removing item from outfit:", err);
    throw new Error("Failed to remove item from outfit");
  }
};

// Export the functions
module.exports = {
  createOutfitItem,
  getOutfitItemsByOutfitId,
  updateOutfitItem,
  removeItemFromOutfit,
};
