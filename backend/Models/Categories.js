const { DataTypes } = require('sequelize');
const sequelize = require('../Config/DBconfig');

const Category = sequelize.define('Category', {
    category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'categories',
    timestamps: false
});

module.exports = Category;
