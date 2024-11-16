const Category = require('../Models/Categories');

const getCategories = async () => {
    try {
        const categories = await Category.findAll();
        return categories;
    } catch (err) {
        console.error('Error getting categories:', err);
        throw new Error('Failed to get categories');
    }
}

module.exports = {
    getCategories
};