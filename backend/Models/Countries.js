const {DataTypes} = require('sequelize');
const sequelize = require('../Config/DBconfig');

const Country = sequelize.define('Country', {
    country_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    country_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'countries',
    timestamps: false
});

module.exports = Country;