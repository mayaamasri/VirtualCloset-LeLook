const axios = require("axios");
const Country = require("../Models/Countries");

// Get the list of countries from the restcountries API
const getCountries = async () => {
  try {
    // Get the list of countries
    const response = await axios.get("https://restcountries.com/v3.1/all");
    const countries = response.data
      .map((country) => {
        return {
          country_name: country.name.common,
        };
      })
      // Sort the countries by name
      .sort((a, b) => a.name.localeCompare(b.name));
    return countries;
  } catch (err) {
    console.error("Error getting countries:", err);
    throw new Error("Failed to get countries");
  }
};

// Seed the countries table with the list of countries
const seedCountries = async () => {
  try {
    const countries = await getCountries();
    await Country.bulkCreate(countries);
    return countries;
  } catch (err) {
    console.error("Error seeding countries:", err);
    throw new Error("Failed to seed countries");
  }
};

// Seed the countries table
seedCountries()
  .then((countries) => {
    console.log("Countries seeded:", countries);
  })
  .catch((err) => {
    console.error("Error seeding countries:", err);
  });
