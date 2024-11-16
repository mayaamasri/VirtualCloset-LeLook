const {
    createUserPreference,
    getUserPreference,
    updateUserPreference,
} = require("../Services/UserPrefService");

const createUserPreferenceController = async (req, res) => {
    const { user_id, preferred_style, favorite_colors, preferred_fit, weather_sensitivity } = req.body;
    
    try {
        if(!user_id || !preferred_style || !favorite_colors || !preferred_fit || !weather_sensitivity) {
            return res.status(400).json({error: "Missing required fields"});
        }
        const userPreference = await createUserPreference(user_id, preferred_style, favorite_colors, preferred_fit, weather_sensitivity);
        if(!userPreference) {
            return res.status(500).json({error: "Failed to create user preference"});
        }
        res.status(201).json(userPreference);
    } catch (err) {
        res.status(400).json({error: err?.message});
    }
}

const getUserPreferenceController = async (req, res) => {
    const user_id = req.params.id;
    try {
        if(!user_id) {
            return res.status(400).json({error: "Missing user ID"});
        }
        const userPreference = await getUserPreference(user_id);
        if(!userPreference) {
            return res.status(404).json({error: "User preference not found"});
        }
        res.status(200).json(userPreference);
    } catch (err) {
        res.status(500).json({error: err?.message});
    }
}

const updateUserPreferenceController = async (req, res) => {
    const user_id = req.params.id;
    const { preferred_style, favorite_colors, preferred_fit, weather_sensitivity } = req.body;
    try {
        if(!user_id) {
            return res.status(400).json({error: "Missing user ID"});
        }
        const userPreference = await getUserPreference(user_id);
        if(!userPreference) {
            return res.status(404).json({error: "User preference not found"});
        }
        const updated = await updateUserPreference(user_id, preferred_style, favorite_colors, preferred_fit, weather_sensitivity);
        if(!updated) {
            return res.status(500).json({error: "Failed to update user preference"});
        }
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({error: err?.message});
    }
}

module.exports = {
    createUserPreferenceController,
    getUserPreferenceController,
    updateUserPreferenceController
};