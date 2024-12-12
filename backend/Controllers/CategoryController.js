const {
    getCategories
} = require('../Services/CategoriesService');

// Controller for getting all categories
const getAllCategoriesController = async (req, res) => {
    try {
        // Get all categories from the database
        const categories = await getCategories();
        res.status(200).json(categories);
    } catch (err) {
        // Log the error message
        res.status(500).json({error: err?.message});
    }
}

// Export the module
module.exports = {
    getAllCategoriesController
};