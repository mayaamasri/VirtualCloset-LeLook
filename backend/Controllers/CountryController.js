const {
    getCountries
} = require('../Services/CountriesService');

const getAllCountriesController = async (req, res) => {
    try {
        const countries = await getCountries();
        res.status(200).json(countries);
    } catch (err) {
        res.status(500).json({error: err?.message});
    }
}

module.exports = {
    getAllCountriesController
};