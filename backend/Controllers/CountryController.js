const {
    getCountries
} = require('../Services/CountriesService');


// Controller for getting all countries
const getAllCountriesController = async (req, res) => {
    try {
        // Get all countries from the database
        const countries = await getCountries();
        res.status(200).json(countries);
    } catch (err) {
        res.status(500).json({error: err?.message});
    }
}

// Export the module
module.exports = {
    getAllCountriesController
};