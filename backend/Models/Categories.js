const { DataTypes } = require("sequelize");
const sequelize = require("../Config/DBconfig");

// Define the Category model
const Category = sequelize.define(
  "Category",
  {
    // Define the attributes of the Category model
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    // Define the options of the Category model
    tableName: "categories",
    timestamps: false,
  }
);

module.exports = Category;
