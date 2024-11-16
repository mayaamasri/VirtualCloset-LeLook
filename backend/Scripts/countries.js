const axios = require('axios');
const Country = require('../Models/Countries');

const getCountries = async () => {
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countries = response.data.map(country => {
            return {
                country_name: country.name.common
            }
        })
        .sort((a, b) => a.name.localeCompare(b.name));
        return countries;
    } catch (err) {
        console.error('Error getting countries:', err);
        throw new Error('Failed to get countries');
    }
}

const seedCountries = async () => {
    try {
        const countries = await getCountries();
        await Country.bulkCreate(countries);
        return countries;
    } catch (err) {
        console.error('Error seeding countries:', err);
        throw new Error('Failed to seed countries');
    }
}

seedCountries().then(countries => {
    console.log('Countries seeded:', countries);
}).catch(err => {
    console.error('Error seeding countries:', err);
});

