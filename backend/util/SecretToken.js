require('dotenv').config();
const jwt = require('jsonwebtoken');

const createSecretToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = {createSecretToken};