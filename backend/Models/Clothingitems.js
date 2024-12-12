const { DataTypes } = require("sequelize");
const sequelize = require("../Config/DBconfig");
const User = require("./User");
const Category = require("./Categories");

// Define the ClothingItems model
const ClothingItems = sequelize.define(
  "ClothingItems",
  {
    // Define the attributes of the ClothingItems model
    item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    color: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    season: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Define the options of the ClothingItems model
    tableName: "clothing_items",
    timestamps: false,
  }
);

// Define the relationships between the ClothingItems model and the User and Category models
ClothingItems.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(ClothingItems, { foreignKey: "user_id" });

ClothingItems.belongsTo(Category, { foreignKey: "category_id" });
Category.hasMany(ClothingItems, { foreignKey: "category_id" });

module.exports = ClothingItems;
