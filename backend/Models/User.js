const { DataTypes } = require("sequelize");
const sequelize = require("../Config/DBconfig");
const Countries = require("./Countries");

// Define the User model
const User = sequelize.define(
  "User",
  {
    // Define the attributes of the User model
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },

    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    // Define the options of the User model
    tableName: "users",
    timestamps: false,
  }
);

// Define the relationships between the User model and the Country model
User.belongsTo(Countries, { foreignKey: "country_id" });
Countries.hasMany(User, { foreignKey: "country_id" });

module.exports = User;
