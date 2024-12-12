const {
    createItem,
    getAllItemsByUserId,
    getItemById,
    getItemByCategory,
    getItemBySeason,
    getItemByColor,
    updateItem,
    deleteItem
} = require('../Services/ClothingItemsService');

const createItemController = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        console.log('Request file:', req.file);

        // Extract required fields from the request body
        const { user_id, name, category_name, color, season } = req.body;
        
        // Check if any required fields are missing
        if (!user_id || !name || !category_name || !color || !season) {
            return res.status(400).json({ 
                error: "Missing required fields",
                received: { user_id, name, category_name, color, season }
            });
        }

        // Check if an image file is attached
        if (!req.file) {
            return res.status(400).json({ error: "Image file is required" });
        }

        // Construct the image URL 
        const image_url = `/uploads/${req.file.filename}`;

        // Create a new item in the database
        const item = await createItem(
            name,               // Item name
            category_name,      // Category name
            color,              // Item color
            season,             // Item season
            image_url,          // Image URL
            user_id             // User ID
        );

        // Check if the item was created successfully
        if (!item) {
            return res.status(500).json({ error: "Failed to create item" });
        }

        // Return a success response
        res.status(201).json({ 
            message: "Item created successfully",
            item 
        });
    } catch (err) {
        console.error('Error in createItemController:', err);
        res.status(500).json({ 
            error: "Internal server error", 
            details: err.message 
        });
    }
};

// Controller for getting all items by user ID
const getAllItemsByUserIdController = async (req, res) => {
    // Extract the user ID from the request parameters
    const user_id = req.params.user_id;
    try {
        // Check if the user ID is missing
        if (!user_id) {
            return res.status(400).json({ error: "Missing user ID" });
        }
        // Get all items by user ID from the database
        const items = await getAllItemsByUserId(user_id);
        console.log('Retrieved items:', items);
        if (!items) {
            return res.status(404).json({ error: "Items not found" });
        }
        res.status(200).json({
            success: true,
            items: items || []
        });
    } catch (err) {
        console.error('Error in getAllItemsByUserIdController:', err);
        res.status(500).json({ error: err?.message });
    }
}

// Controller for getting an item by ID
const getItemByIdController = async (req, res) => {
    // Extract the item ID from the request parameters
    const item_id = req.params.id;
    try {
        // Check if the item ID is missing
        if (!item_id) {
            return res.status(400).json({ error: "Missing item ID" });
        }
        // Get the item by ID from the database
        const item = await getItemById(item_id);
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
}

// Controller for getting items by category
const getItemByCategoryController = async (req, res) => {
    // Extract the user ID and category name from the request parameters
    const {user_id} = req.params;
    const {category_name} = req.query;
    try {
        // Check if the user ID or category name is missing
        if (!user_id || !category_name) {
            return res.status(400).json({ error: "Missing user ID or category" });
        }

        // Get items by category from the database
        const items = await getItemByCategory(user_id, category_name);
        if (!items) {
            // Return an error response if no items are found
            return res.status(404).json({ error: "Items not found" });
        }
        // Return the items in the response
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
}

// Controller for getting items by season
const getItemBySeasonController = async (req, res) => {
    // Extract the user ID and season from the request parameters
    const {user_id} = req.params;
    const {season} = req.query;
    try {
        // Check if the user ID or season is missing
        if (!user_id || !season) {
            return res.status(400).json({ error: "Missing user ID or season" });
        }
        // Get items by season from the database
        const items = await getItemBySeason(user_id, season);
        if (!items) {
            // Return an error response if no items are found
            return res.status(404).json({ error: "Items not found" });
        }
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
}

// Controller for getting items by color
const getItemByColorController = async (req, res) => {
    // Extract the user ID and color from the request parameters
    const {user_id} = req.params;
    const {color} = req.query;
    try {
        // Check if the user ID or color is missing
        if (!user_id || !color) {
            return res.status(400).json({ error: "Missing user ID or color" });
        }
        // Get items by color from the database
        const items = await getItemByColor(user_id, color);
        if (!items) {
            return res.status(404).json({ error: "Items not found" });
        }
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
}

// Controller for updating an item
const updateItemController = async (req, res) => {
    // Extract the item ID and item details from the request body
    const item_id = req.params.id;
    const { name, category_name, color, season, image_url } = req.body;
    try {
        // Check if the item ID is missing
        if (!item_id) {
            return res.status(400).json({ error: "Missing item ID" });
        }
        // Get the item by ID from the database
        const item = await getItemById(item_id);
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }
        // Update the item in the database
        const updated = await updateItem(item_id, name, category_name, color, season, image_url);
        if (!updated) {
            return res.status(500).json({ error: "Failed to update item" });
        }
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
}

// Controller for deleting an item
const deleteItemController = async (req, res) => {
    // Extract the item ID from the request parameters
    const item_id = req.params.id;
    try {
        // Check if the item ID is missing
        if (!item_id) {
            return res.status(400).json({ error: "Missing item ID" });
        }
        // Get the item by ID from the database
        const item = await getItemById(item_id);
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }
        // Delete the item from the database
        const deleted = await deleteItem(item_id);
        if (!deleted) {
            return res.status(500).json({ error: "Failed to delete item" });
        }
        res.status(200).json(deleted);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
}

// Export the module
module.exports = {
    createItemController,
    getAllItemsByUserIdController,
    getItemByIdController,
    getItemByCategoryController,
    getItemBySeasonController,
    getItemByColorController,
    updateItemController,
    deleteItemController
};
