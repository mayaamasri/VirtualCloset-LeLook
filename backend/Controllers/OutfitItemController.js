const {
    createOutfitItem,
    getOutfitItemsByOutfitId,
    updateOutfitItem,
    removeItemFromOutfit
} = require ('../Services/OutfitItemsService');

// Controller for creating an outfit item
const createOutfitItemController = async(req,res) => {
    // Extract the outfit ID, item ID, and position from the request body
    const { outfit_id, item_id, position} = req.body;
    try {
        // Create an outfit item in the database
        const outfitItem = await createOutfitItem(outfit_id, item_id, position);
        if(!outfitItem) {
            return res.status(500).json({message: "Failed to create outfit item"});
        }
        // Return a success response
        res.status(201).json({outfitItem});
    } catch (err) {
        res.status(500).json({message: err?.message});
    }
}

// Controller for getting outfit items by outfit ID
const getOutfitItemsByOutfitIdController = async(req,res) => {
    // Extract the outfit ID from the request parameters
    const {outfit_id} = req.params;
    try {
        // Get all outfit items by outfit ID from the database
        const outfitItems = await getOutfitItemsByOutfitId(outfit_id);
        res.status(200).json({outfitItems});
    } catch (err) {
        // Log the error message
        res.status(500).json({message: err.message});
    }
}

// Controller for updating an outfit item
const updateOutfitItemController = async(req,res) => {
    // Extract the outfit ID, item ID, and position from the request body
    const { outfit_id, item_id} = req.params;
    const { position } = req.body;
    try {
        // Update the outfit item in the database
        const outfitItem = await updateOutfitItem(outfit_id, item_id, position);
        res.status(200).json(outfitItem);
    } catch (err) {
        // Log the error message
        res.status(500).json({message: err.message});
    }
}

// Controller for removing an item from an outfit
const removeItemFromOutfitController = async(req,res) => {
    // Extract the outfit ID and item ID from the request parameters
    const { outfit_id, item_id } = req.params;
    try {
        // Remove the item from the outfit in the database
        const result = await removeItemFromOutfit(outfit_id, item_id);
        res.status(200).json(result);
    } catch (err) {
        // Log the error message
        res.status(500).json({message: err.message});
    }
}

// Export the module
module.exports = {
    createOutfitItemController,
    getOutfitItemsByOutfitIdController,
    updateOutfitItemController,
    removeItemFromOutfitController
};