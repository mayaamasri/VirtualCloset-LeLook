const ClothingItems = require("../Models/Clothingitems");
const Category = require("../Models/Categories");

const createItem = async (name, category_name, color, season, image_url, user_id) => {
    try {
        console.log('Creating item with params:', {
            name,
            category_name,
            color,
            season,
            image_url,
            user_id
        });

        const category = await Category.findOne({ where: { category_name } });
        if (!category) {
            console.log('Category not found:', category_name);
            throw new Error('Category not found');
        }
        console.log('Found category:', category.toJSON());

        const newItem = await ClothingItems.create({
            name: name,
            category_id: category.category_id,
            color: color,
            season: season,
            image_url: image_url,
            user_id: user_id
        });

        console.log('Item created successfully:', newItem.toJSON());
        return newItem;
    } catch (error) {
        console.error('Error in createItem service:', error);
        throw error;
    }
};


const getAllItemsByUserId = async (user_id) => {
    try {
        const items = await ClothingItems.findAll({ 
            where: { user_id },
            include: [{
                model: Category,
                attributes: ['category_name'],
            }],
        });

        return items.map(item => {
            const plainItem = item.get({ plain: true });
            return {
                ...plainItem,
                category_name: plainItem.Category?.category_name
            };
        });
    } catch (error) {
        console.error('Error getting items:', error);
        throw new Error('Failed to get items');
    }
}

const getItemById = async (id) => {
    try {
        const item = await ClothingItems.findByPk(id);
        if (item) {
            return item.toJSON();
        }
        return "Item not found";
    } catch (error) {
        console.error('Error getting item by ID: ', error);
        throw new Error('Failed to get item');
    }
}


const getItemByCategory = async (user_id, category_name) => {
    try {
        const category = await Category.findOne({ where: { category_name } });
        if (!category) {
            throw new Error('Category not found');
        }
        const items = await ClothingItems.findAll({ where: { user_id, category_id: category.category_id } });
        return items;
    } catch (error) {
        console.error('Error getting items:', error);
        throw new Error('Failed to get items');
    }
}

const getItemBySeason = async (user_id, season) => {
    try {
        const items = await ClothingItems.findAll({ where: { user_id, season } });
        return items;
    } catch (error) {
        console.error('Error getting items:', error);
        throw new Error('Failed to get items');
    }
}

const getItemByColor = async (user_id, color) => {
    try {
        const items = await ClothingItems.findAll({ where: { user_id, color } });
        return items;
    } catch (error) {
        console.error('Error getting items:', error);
        throw new Error('Failed to get items');
    }
}

const updateItem = async (id, name, category_name, color, season, image_url) => {
    try {
        const category = await Category.findOne({ where: { category_name } });
        if (!category) {
            throw new Error('Category not found');
        }
        const updated = await ClothingItems.update({
            name: name,
            category_id: category.category_id,
            color: color,
            season: season,
            image_url: image_url
        }, { where: { item_id: id } });

        return updated;
    } catch (error) {
        console.error('Error updating item:', error);
        throw new Error('Failed to update item');
    }
}

const deleteItem = async (id) => {
    try {
        const item = await ClothingItems.findByPk(id);
        if (item) {
            await ClothingItems.destroy({ where: { item_id: id } });
            return item;
        }
        return "Item not found";
    } catch (error) {
        console.error('Error deleting item:', error);
        throw new Error('Failed to delete item');
    }
}

module.exports = {
    createItem,
    getAllItemsByUserId,
    getItemById,
    getItemByCategory,
    getItemBySeason,
    getItemByColor,
    updateItem,
    deleteItem
};