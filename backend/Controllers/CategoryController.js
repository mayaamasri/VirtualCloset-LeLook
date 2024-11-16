const {
    getCategories
} = require('../Services/CategoriesService');

const getAllCategoriesController = async (req, res) => {
    try {
        const categories = await getCategories();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({error: err?.message});
    }
}

module.exports = {
    getAllCategoriesController
};