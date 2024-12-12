const Category = require("../Models/Categories");

// Seed the categories table with the following categories
const getCategories = async () => {
  try {
    // Get the list of categories
    const categories = await Category.findAll();
    return categories;
  } catch (err) {
    console.error("Error getting categories:", err);
    throw new Error("Failed to get categories");
  }
};

// Export the functions
module.exports = {
  getCategories,
};
