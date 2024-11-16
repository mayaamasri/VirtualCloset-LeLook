const { DataTypes } = require('sequelize');
const sequelize = require('../Config/DBconfig');
const Outfit = require('../Models/Outfits');
const ClothingItem = require('../Models/Clothingitems');

const OutfitItem = sequelize.define('OutfitItem', {
  outfit_item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
},
  position: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  scale : {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 1
  },
  position_index: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
}, { tableName: 'outfit_items', timestamps: false });

Outfit.belongsToMany(ClothingItem, { through: OutfitItem, foreignKey: 'outfit_id' });
ClothingItem.belongsToMany(Outfit, { through: OutfitItem, foreignKey: 'item_id' });

module.exports = OutfitItem;
