const {DataTypes} = require("sequelize");
const sequelize = require("../Config/DBconfig");
const Countries = require("./Countries");

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    first_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false
    },

    password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: false
});

User.belongsTo(Countries, { foreignKey: 'country_id' });
Countries.hasMany(User, { foreignKey: 'country_id' });

module.exports = User;
