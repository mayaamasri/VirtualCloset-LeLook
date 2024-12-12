const { DataTypes } = require("sequelize");
const sequelize = require("../Config/DBconfig");
const User = require("./User");

// Define the UserPreference model
const UserPreference = sequelize.define(
  "UserPreference",
  {
    // Define the attributes of the UserPreference model
    preference_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    preferred_style: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    favorite_colors: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
    },

    preferred_fit: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    weather_sensitivity: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    // Define the options of the UserPreference model
    tableName: "user_preferences",
    timestamps: false,
  }
);

// Define the relationships between the UserPreference model and the User model
UserPreference.belongsTo(User, { foreignKey: "user_id" });
User.hasOne(UserPreference, { foreignKey: "user_id" });

module.exports = UserPreference;
