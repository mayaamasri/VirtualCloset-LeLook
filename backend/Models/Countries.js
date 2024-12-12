const { DataTypes } = require("sequelize");
const sequelize = require("../Config/DBconfig");

// Define the Country model
const Country = sequelize.define(
  "Country",
  {
    // Define the attributes of the Country model
    country_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    country_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    // Define the options of the Country model
    tableName: "countries",
    timestamps: false,
  }
);

module.exports = Country;
