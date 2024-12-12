const {
    createOutfit,
    getOutfitById,
    getOutfitsByUserId,
    getOutfitBySeason,
    getOutfitByOccasion,
    updateOutfit,
    deleteOutfit
} = require('../Services/OutfitsService');

const {
    createOutfitItem,
} = require('../Services/OutfitItemsService');
const { validationResult } = require('express-validator');

// Controller for creating an outfit
const createOutfitController = async (req, res) => {
    try {
        // Validate the request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract the user ID, name, occasion, season, and items from the request body
        const { user_id, name, occasion, season } = req.body;
        let items = [];
        
        // Parse the items data from the request body
        try {
            items = req.body.items || [];
            // Parse the items data from the request body
            if (typeof items === 'string') {
                items = JSON.parse(items);
            }
        } catch (err) {
            console.error('Error parsing items:', err);
            return res.status(400).json({ error: "Invalid items data" });
        }

        // Create the outfit in the database
        let image_url = null;
        if (req.file) {
            image_url = `/uploads/${req.file.filename}`;
        }

        const outfit = await createOutfit(
            name,
            occasion,
            season,
            image_url,
            user_id
        );

        if (items && items.length > 0) {
            for (const item of items) {
                await createOutfitItem(
                    outfit.outfit_id,
                    item.item_id,
                    item.position,
                    item.scale,
                    item.position_index
                );
            }
        }

        // Get the complete outfit data
        const completeOutfit = await getOutfitById(outfit.outfit_id);

        // Return a success response
        res.status(201).json({
            message: "Outfit created successfully",
            outfit: completeOutfit
        });
    } catch (err) {
        console.error('Error in createOutfitController:', err);
        res.status(500).json({
            error: "Internal server error",
            details: err.message
        });
    }
};


// Controller for getting an outfit by ID
const getOutfitByIdController = async (req, res) => {
    // Extract the outfit ID from the request parameters
    const outfit_id = req.params.id;
    try {
        if (!outfit_id) {
            return res.status(400).json({ error: "Missing outfit ID" });
        }
        // Get the outfit by ID from the database
        const outfit = await getOutfitById(outfit_id);
        if (!outfit) {
            return res.status(404).json({ error: "Outfit not found" });
        }
        res.status(200).json(outfit);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
};

// Controller for getting outfits by user ID
const getOutfitsByUserIdController = async (req, res) => {
    // Extract the user ID from the request parameters
    const user_id = req.params.user_id;
    try {
        // Check if the user ID is missing
        if (!user_id) {
            return res.status(400).json({ 
                success: false,
                error: "Missing user ID" 
            });
        }

        // Get all outfits by user ID from the database
        console.log('Fetching outfits for user:', user_id);
        const outfits = await getOutfitsByUserId(user_id);
        
        console.log('Processed outfits:', JSON.stringify(outfits, null, 2));

        // Return a success response
        res.status(200).json({
            success: true,
            outfits: outfits || []
        });
    } catch (err) {
        console.error('Error in getOutfitsByUserIdController:', err);
        // Return an error response
        res.status(500).json({ 
            success: false,
            error: err.message || "Failed to fetch outfits" 
        });
    }
};

// Controller for getting outfits by season
const getOutfitBySeasonController = async (req, res) => {
    // Extract the user ID and season from the request parameters
    const {user_id} = req.params;
    const {season} = req.query;
    try {
        // Check if the user ID or season is missing
        if (!user_id || !season) {
            return res.status(400).json({ error: "Missing user ID or season" });
        }
        // Get outfits by season from the database
        const outfits = await getOutfitBySeason(user_id, season);
        if (!outfits) {
            return res.status(404).json({ error: "Outfits not found" });
        }
        res.status(200).json(outfits);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
}

// Controller for getting outfits by occasion
const getOutfitByOccasionController = async (req, res) => {
    // Extract the user ID and occasion from the request parameters
    const {user_id} = req.params;
    const {occasion} = req.query;
    try {
        // Check if the user ID or occasion is missing
        if (!user_id || !occasion) {
            return res.status(400).json({ error: "Missing user ID or occasion" });
        }
        // Get outfits by occasion from the database
        const outfits = await getOutfitByOccasion(user_id, occasion);
        if (!outfits) {
            return res.status(404).json({ error: "Outfits not found" });
        }
        // Return the outfits in the response
        res.status(200).json(outfits);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
}

// Controller for updating an outfit
const updateOutfitController = async (req, res) => {
    // Extract the outfit ID from the request parameters
    const outfit_id = req.params.id;
    const { name, occasion, season, items } = req.body;
    
    try {
        // Check if the outfit ID is missing
        if (!outfit_id) {
            return res.status(400).json({ error: "Missing outfit ID" });
        }

        // Get the outfit by ID from the database
        const outfit = await getOutfitById(outfit_id);
        if (!outfit) {
            return res.status(404).json({ error: "Outfit not found" });
        }

        // Update the outfit in the database
        let image_url = outfit.image_url;
        if (req.file) {
            if (outfit.image_url) {
                try {
                    const oldImagePath = path.join(__dirname, '../public', outfit.image_url);
                    await fs.unlink(oldImagePath);
                } catch (err) {
                    console.error('Error deleting old image:', err);
                }
            }
            image_url = `/uploads/${req.file.filename}`;
        }

        // Update the outfit in the database
        const updated = await updateOutfit(
            outfit_id,
            name,
            occasion,
            season,
            image_url
        );

        if (!updated) {
            return res.status(500).json({ error: "Failed to update outfit" });
        }

        // Update the outfit items
        if (items) {
            const parsedItems = JSON.parse(items);
            for (const item of parsedItems) {
                await createOutfitItem(
                    outfit_id,
                    item.item_id,
                    item.position,
                    item.scale,
                    item.position_index
                );
            }
        }

        // Return a success response
        res.status(200).json(updated);
    } catch (err) {
        console.error('Error in updateOutfitController:', err);
        res.status(500).json({ error: err?.message });
    }
};

// Controller for deleting an outfit
const deleteOutfitController = async (req, res) => {
    // Extract the outfit ID from the request parameters
    const outfit_id = req.params.id;
    try {
        // Check if the outfit ID is missing
        if (!outfit_id) {
            return res.status(400).json({ error: "Missing outfit ID" });
        }
        // Get the outfit by ID from the database
        const outfit = await getOutfitById(outfit_id);
        if (!outfit) {
            return res.status(404).json({ error: "Outfit not found" });
        }
        // Delete the outfit from the database
        const deleted = await deleteOutfit(outfit_id);
        if (!deleted) {
            return res.status(500).json({ error: "Failed to delete outfit" });
        }
        // Return a success response
        res.status(200).json({ message: "Outfit deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
}

// Export the controllers
module.exports = {
    createOutfitController,
    getOutfitByIdController,
    getOutfitsByUserIdController,
    getOutfitBySeasonController,
    getOutfitByOccasionController,
    updateOutfitController,
    deleteOutfitController
}