const {
    createUserPreference,
    getUserPreference,
    updateUserPreference,
} = require("../Services/UserPrefService");

// Controller for creating a user preference
const createUserPreferenceController = async (req, res) => {
    // Extract the user ID, preferred style, favorite colors, preferred fit, and weather sensitivity from the request body
    const { user_id, preferred_style, favorite_colors, preferred_fit, weather_sensitivity } = req.body;
    
    try {
        // Check if any required fields are missing
        if(!user_id || !preferred_style || !favorite_colors || !preferred_fit || !weather_sensitivity) {
            return res.status(400).json({error: "Missing required fields"});
        }
        // Create a new user preference in the database
        const userPreference = await createUserPreference(user_id, preferred_style, favorite_colors, preferred_fit, weather_sensitivity);
        if(!userPreference) {
            return res.status(500).json({error: "Failed to create user preference"});
        }
        // Return a success response
        res.status(201).json(userPreference);
    } catch (err) {
        res.status(400).json({error: err?.message});
    }
}

// Controller for getting a user preference by user ID
const getUserPreferenceController = async (req, res) => {
    // Extract the user ID from the request parameters
    const user_id = req.params.id;
    try {
        // Check if the user ID is missing
        if(!user_id) {
            return res.status(400).json({error: "Missing user ID"});
        }
        // Get the user preference by user ID from the database
        const userPreference = await getUserPreference(user_id);
        if(!userPreference) {
            return res.status(404).json({error: "User preference not found"});
        }
        // Return the user preference in the response
        res.status(200).json(userPreference);
    } catch (err) {
        res.status(500).json({error: err?.message});
    }
}

// Controller for updating a user preference
const updateUserPreferenceController = async (req, res) => {
    // Extract the user ID, preferred style, favorite colors, preferred fit, and weather sensitivity from the request body
    const user_id = req.params.id;
    const { preferred_style, favorite_colors, preferred_fit, weather_sensitivity } = req.body;
    try {
        if(!user_id) {
            return res.status(400).json({error: "Missing user ID"});
        }
        // Get the user preference by user ID from the database
        const userPreference = await getUserPreference(user_id);
        if(!userPreference) {
            return res.status(404).json({error: "User preference not found"});
        }
        // Update the user preference in the database
        const updated = await updateUserPreference(user_id, preferred_style, favorite_colors, preferred_fit, weather_sensitivity);
        if(!updated) {
            return res.status(500).json({error: "Failed to update user preference"});
        }
        // Return a success response
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({error: err?.message});
    }
}

// Export the module
module.exports = {
    createUserPreferenceController,
    getUserPreferenceController,
    updateUserPreferenceController
};