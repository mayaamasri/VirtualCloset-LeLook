const {
    createOutfitItem,
    getOutfitItemsByOutfitId,
    updateOutfitItem,
    removeItemFromOutfit
} = require ('../Services/OutfitItemsService');

const createOutfitItemController = async(req,res) => {
    const { outfit_id, item_id, position} = req.body;
    try {
        const outfitItem = await createOutfitItem(outfit_id, item_id, position);
        if(!outfitItem) {
            return res.status(500).json({message: "Failed to create outfit item"});
        }
        res.status(201).json({outfitItem});
    } catch (err) {
        res.status(500).json({message: err?.message});
    }
}

const getOutfitItemsByOutfitIdController = async(req,res) => {
    const {outfit_id} = req.params;
    try {
        const outfitItems = await getOutfitItemsByOutfitId(outfit_id);
        res.status(200).json({outfitItems});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

const updateOutfitItemController = async(req,res) => {
    const { outfit_id, item_id} = req.params;
    const { position } = req.body;
    try {
        const outfitItem = await updateOutfitItem(outfit_id, item_id, position);
        res.status(200).json(outfitItem);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

const removeItemFromOutfitController = async(req,res) => {
    const { outfit_id, item_id } = req.params;
    try {
        const result = await removeItemFromOutfit(outfit_id, item_id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

module.exports = {
    createOutfitItemController,
    getOutfitItemsByOutfitIdController,
    updateOutfitItemController,
    removeItemFromOutfitController
};