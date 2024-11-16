const Country = require('../Models/Countries');

const getCountries = async () => {
    try {
        const countries = await Country.findAll();
        return countries;
    } catch (err) {
        console.error('Error getting countries:', err);
        throw new Error('Failed to get countries');
    }
}

module.exports = {
    getCountries
};