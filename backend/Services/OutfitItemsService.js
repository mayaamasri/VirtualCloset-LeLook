// services/OutfitItemsService.js
const OutfitItems = require('../Models/OutfitItems');

const createOutfitItem = async (outfit_id, item_id, position, scale, position_index) => {
    try {
        // Ensure position is properly formatted
        const formattedPosition = typeof position === 'string' 
            ? JSON.parse(position) 
            : position;

        const outfitItem = await OutfitItems.create({
            outfit_id,
            item_id,
            position: formattedPosition, // Now storing as JSON
            scale,
            position_index
        });
        return outfitItem;
    } catch (err) {
        console.error('Error creating outfit item:', err);
        throw new Error('Failed to create outfit item');
    }
};

const getOutfitItemsByOutfitId = async (outfit_id) => {
    try {
        const outfitItems = await OutfitItems.findAll({
            where: { outfit_id },
            order: [['position_index', 'ASC']]
        });
        return outfitItems;
    } catch (err) {
        console.error('Error getting outfit items:', err);
        throw new Error('Failed to get outfit items');
    }
};

const updateOutfitItem = async (outfit_id, item_id, position, scale, position_index) => {
    try {
        const outfitItem = await OutfitItems.findOne({
            where: { outfit_id, item_id }
        });
        
        if (!outfitItem) {
            throw new Error('Outfit item not found');
        }

        const formattedPosition = typeof position === 'string' 
            ? JSON.parse(position) 
            : position;

        const updated = await outfitItem.update({
            position: formattedPosition,
            scale,
            position_index
        });
        return updated;
    } catch (err) {
        console.error('Error updating outfit item:', err);
        throw new Error('Failed to update outfit item');
    }
};

const removeItemFromOutfit = async (outfit_id, item_id) => {
    try {
        const outfitItem = await OutfitItem.findOne({where: {outfit_id, item_id}});
        if(!outfitItem) throw new Error('Item not found in outfit');
        await outfitItem.destroy();
        return {message: 'Item removed from outfit'};
    } catch (err) {
        console.error('Error removing item from outfit:', err);
        throw new Error('Failed to remove item from outfit');
    }
}

module.exports = {
    createOutfitItem,
    getOutfitItemsByOutfitId,
    updateOutfitItem,
    removeItemFromOutfit
};