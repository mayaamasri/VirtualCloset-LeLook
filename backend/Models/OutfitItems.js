const { DataTypes } = require("sequelize");
const sequelize = require("../Config/DBconfig");
const Outfit = require("../Models/Outfits");
const ClothingItem = require("../Models/Clothingitems");

// Define the OutfitItem model
const OutfitItem = sequelize.define(
  "OutfitItem",
  {
    // Define the attributes of the OutfitItem model
    outfit_item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    position: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    scale: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 1,
    },
    position_index: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  { tableName: "outfit_items", timestamps: false }
);

// Define the relationships between the OutfitItem model and the Outfit and ClothingItem models
Outfit.belongsToMany(ClothingItem, {
  through: OutfitItem,
  foreignKey: "outfit_id",
});
ClothingItem.belongsToMany(Outfit, {
  through: OutfitItem,
  foreignKey: "item_id",
});

module.exports = OutfitItem;
