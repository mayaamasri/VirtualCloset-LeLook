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

const createOutfitController = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { user_id, name, occasion, season } = req.body;
        let items = [];
        
        try {
            items = req.body.items || [];
            if (typeof items === 'string') {
                items = JSON.parse(items);
            }
        } catch (err) {
            console.error('Error parsing items:', err);
            return res.status(400).json({ error: "Invalid items data" });
        }

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

        const completeOutfit = await getOutfitById(outfit.outfit_id);

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

const getOutfitByIdController = async (req, res) => {
    const outfit_id = req.params.id;
    try {
        if (!outfit_id) {
            return res.status(400).json({ error: "Missing outfit ID" });
        }
        const outfit = await getOutfitById(outfit_id);
        if (!outfit) {
            return res.status(404).json({ error: "Outfit not found" });
        }
        res.status(200).json(outfit);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
};


const getOutfitsByUserIdController = async (req, res) => {
    const user_id = req.params.user_id;
    try {
        if (!user_id) {
            return res.status(400).json({ 
                success: false,
                error: "Missing user ID" 
            });
        }

        console.log('Fetching outfits for user:', user_id);
        const outfits = await getOutfitsByUserId(user_id);
        
        console.log('Processed outfits:', JSON.stringify(outfits, null, 2));

        res.status(200).json({
            success: true,
            outfits: outfits || []
        });
    } catch (err) {
        console.error('Error in getOutfitsByUserIdController:', err);
        res.status(500).json({ 
            success: false,
            error: err.message || "Failed to fetch outfits" 
        });
    }
};

const getOutfitBySeasonController = async (req, res) => {
    const {user_id} = req.params;
    const {season} = req.query;
    try {
        if (!user_id || !season) {
            return res.status(400).json({ error: "Missing user ID or season" });
        }
        const outfits = await getOutfitBySeason(user_id, season);
        if (!outfits) {
            return res.status(404).json({ error: "Outfits not found" });
        }
        res.status(200).json(outfits);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
}

const getOutfitByOccasionController = async (req, res) => {
    const {user_id} = req.params;
    const {occasion} = req.query;
    try {
        if (!user_id || !occasion) {
            return res.status(400).json({ error: "Missing user ID or occasion" });
        }
        const outfits = await getOutfitByOccasion(user_id, occasion);
        if (!outfits) {
            return res.status(404).json({ error: "Outfits not found" });
        }
        res.status(200).json(outfits);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
}

const updateOutfitController = async (req, res) => {
    const outfit_id = req.params.id;
    const { name, occasion, season, items } = req.body;
    
    try {
        if (!outfit_id) {
            return res.status(400).json({ error: "Missing outfit ID" });
        }

        const outfit = await getOutfitById(outfit_id);
        if (!outfit) {
            return res.status(404).json({ error: "Outfit not found" });
        }

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

        res.status(200).json(updated);
    } catch (err) {
        console.error('Error in updateOutfitController:', err);
        res.status(500).json({ error: err?.message });
    }
};

const deleteOutfitController = async (req, res) => {
    const outfit_id = req.params.id;
    try {
        if (!outfit_id) {
            return res.status(400).json({ error: "Missing outfit ID" });
        }
        const outfit = await getOutfitById(outfit_id);
        if (!outfit) {
            return res.status(404).json({ error: "Outfit not found" });
        }
        const deleted = await deleteOutfit(outfit_id);
        if (!deleted) {
            return res.status(500).json({ error: "Failed to delete outfit" });
        }
        res.status(200).json({ message: "Outfit deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
}

module.exports = {
    createOutfitController,
    getOutfitByIdController,
    getOutfitsByUserIdController,
    getOutfitBySeasonController,
    getOutfitByOccasionController,
    updateOutfitController,
    deleteOutfitController
}