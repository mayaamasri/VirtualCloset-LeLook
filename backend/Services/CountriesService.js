const Country = require('../Models/Countries');

// Get the list of countries from the database
const getCountries = async () => {
    try {
        // Get the list of countries
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