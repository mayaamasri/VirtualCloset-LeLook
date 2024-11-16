const axios = require('axios');
const Category = require('../Models/Categories');

const seedCategories = async () => {
    const categories = [
        { category_name: 'Dresses' },
        { category_name: 'Blazers' },
        { category_name: 'Knitwear' },
        { category_name: 'Sweatshirts | Hoodies' },
        { category_name: 'Skirts' },
        { category_name: 'Shorts' },
        { category_name: 'Joggers' },
        { category_name: 'T-Shirts' },
        { category_name: 'Jackets' },
        { category_name: 'Jeans' },
        { category_name: 'Trousers' },
        { category_name: 'Tops' },
        { category_name: 'Coats' },
        { category_name: 'Shoes' },
        { category_name: 'Bags' },
        { category_name: 'Accessories' }
    ];

    try {
        await Category.bulkCreate(categories, { ignoreDuplicates: true });
        console.log('Categories seeded successfully.');
    } catch (error) {
        console.error('Error seeding categories:', error);
    }
}

seedCategories();
