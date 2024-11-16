const {DataTypes} = require("sequelize");
const sequelize = require("../Config/DBconfig");
const User = require("./User");

const Outfit = sequelize.define('Outfit', {
    outfit_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    occasion: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    season: {
        type: DataTypes.ENUM('spring', 'summer', 'fall', 'winter'),
        allowNull: false
    },

    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },

    image_url: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'outfits',
    timestamps: false,
});

Outfit.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Outfit, { foreignKey: 'user_id' });

module.exports = Outfit;

