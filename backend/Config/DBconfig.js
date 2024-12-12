// Initiate connection to the database

// Importing required modules
const Sequelize = require('sequelize')
const dotenv = require('dotenv');

// Configuring the environment variables
dotenv.config();

// Creating a new Sequelize instance
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST, // Database host
        dialect: process.env.DB_DIALECT // Database dialect
    })

// Authenticating the connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        // Log the error message
        console.log(process.env.DB_PASSWORD);
        console.error('Unable to connect to the database:', err.message || err);
    });

module.exports = sequelize