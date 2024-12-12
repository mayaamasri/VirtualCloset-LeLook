const User = require("../Models/User");
const UserPreference = require("../Models/UserPreference");

// Create a new user preference
const createUserPreference = async (
  userId,
  style,
  colors,
  fit,
  weatherSensitivity
) => {
  try {
    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }
    // Create the user preference
    const newUserPreference = await UserPreference.create({
      user_id: userId,
      preferred_style: style,
      favorite_colors: colors,
      preferred_fit: fit,
      weather_sensitivity: weatherSensitivity,
    });
    return newUserPreference;
  } catch (error) {
    console.error("Error creating user preference:", error);
    throw new Error("Failed to create user preference");
  }
};

// Get a user preference by user ID
const getUserPreference = async (userId) => {
  try {
    // Get the user preference
    const userPreference = await UserPreference.findOne({
      where: { user_id: userId },
    });
    if (userPreference) {
      return userPreference.toJSON();
    }
    return "Not found";
  } catch (error) {
    console.error("Error getting user preference:", error);
    throw new Error("Failed to get user preference");
  }
};

// Update a user preference
const updateUserPreference = async (
  userId,
  style,
  colors,
  fit,
  weatherSensitivity
) => {
  try {
    // Check if the user exists
    const updated = await UserPreference.update(
      {
        preferred_style: style,
        favorite_colors: colors,
        preferred_fit: fit,
        weather_sensitivity: weatherSensitivity,
      },
      {
        where: { user_id: userId },
      }
    );
    return updated;
  } catch (error) {
    console.error("Error updating user preference:", error);
    throw new Error("Failed to update user preference");
  }
};

module.exports = {
  createUserPreference,
  getUserPreference,
  updateUserPreference,
};
