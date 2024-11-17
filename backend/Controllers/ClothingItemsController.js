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

        const { user_id, name, category_name, color, season } = req.body;
        
        if (!user_id || !name || !category_name || !color || !season) {
            return res.status(400).json({ 
                error: "Missing required fields",
                received: { user_id, name, category_name, color, season }
            });
        }

        if (!req.file) {
            return res.status(400).json({ error: "Image file is required" });
        }

        const image_url = `/uploads/${req.file.filename}`;

        const item = await createItem(
            name, 
            category_name, 
            color, 
            season, 
            image_url, 
            user_id
        );

        if (!item) {
            return res.status(500).json({ error: "Failed to create item" });
        }

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

const getAllItemsByUserIdController = async (req, res) => {
    const user_id = req.params.user_id;
    try {
        if (!user_id) {
            return res.status(400).json({ error: "Missing user ID" });
        }
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

const getItemByIdController = async (req, res) => {
    const item_id = req.params.id;
    try {
        if (!item_id) {
            return res.status(400).json({ error: "Missing item ID" });
        }
        const item = await getItemById(item_id);
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
}

const getItemByCategoryController = async (req, res) => {
    const {user_id} = req.params;
    const {category_name} = req.query;
    try {
        if (!user_id || !category_name) {
            return res.status(400).json({ error: "Missing user ID or category" });
        }
        const items = await getItemByCategory(user_id, category_name);
        if (!items) {
            return res.status(404).json({ error: "Items not found" });
        }
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
}

const getItemBySeasonController = async (req, res) => {
    const {user_id} = req.params;
    const {season} = req.query;
    try {
        if (!user_id || !season) {
            return res.status(400).json({ error: "Missing user ID or season" });
        }
        const items = await getItemBySeason(user_id, season);
        if (!items) {
            return res.status(404).json({ error: "Items not found" });
        }
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
}

const getItemByColorController = async (req, res) => {
    const {user_id} = req.params;
    const {color} = req.query;
    try {
        if (!user_id || !color) {
            return res.status(400).json({ error: "Missing user ID or color" });
        }
        const items = await getItemByColor(user_id, color);
        if (!items) {
            return res.status(404).json({ error: "Items not found" });
        }
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
}

const updateItemController = async (req, res) => {
    const item_id = req.params.id;
    const { name, category_name, color, season, image_url } = req.body;
    try {
        if (!item_id) {
            return res.status(400).json({ error: "Missing item ID" });
        }
        const item = await getItemById(item_id);
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }
        const updated = await updateItem(item_id, name, category_name, color, season, image_url);
        if (!updated) {
            return res.status(500).json({ error: "Failed to update item" });
        }
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
}

const deleteItemController = async (req, res) => {
    const item_id = req.params.id;
    try {
        if (!item_id) {
            return res.status(400).json({ error: "Missing item ID" });
        }
        const item = await getItemById(item_id);
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }
        const deleted = await deleteItem(item_id);
        if (!deleted) {
            return res.status(500).json({ error: "Failed to delete item" });
        }
        res.status(200).json(deleted);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
}

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
