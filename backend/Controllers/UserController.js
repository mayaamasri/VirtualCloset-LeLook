const {
    createUser,
    searchUsers,
    getUserProfile,
    getAllUsers,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser,
} = require("../Services/UserService");

// Controller for creating a user
const createUserController = async (req, res) => {
    // Extract the user data from the request body
    const { first_name, username, email, password_hash, country_name } = req.body;
    try {
        // Check if any required fields are missing
        if(!first_name || !username || !email || !password_hash || !country_name) {
            return res.status(400).json({error: "Missing required fields"});
        }
        // Create a new user in the database
        const user = await createUser(first_name, username, email, password_hash, country_name);
        if(!user) {
            return res.status(500).json({error: "Failed to create user"});
        }
        // Return a success response
        res.status(201).json({message: "New User Created", user: user});
    } catch (e) {
        res.status(400).json({error: err?.message});
    }
}

// Controller for getting all users
const getAllUsersController = async (req, res) => {
    try {
        // Get all users from the database
        const users = await getAllUsers();
        res.status(200).json({users});
    } catch (err) {
        res.status(500).json({error: err?.message});
    }
}

// Controller for getting a user by ID
const getUserByIdController = async (req, res) => {
    // Extract the user ID from the request parameters
    const user_id = req.params.id;
    try {
        // Check if the user ID is missing
        if(!user_id) {
            return res.status(400).json({error: "Missing user ID"});
        }
        // Get the user by ID from the database
        const user = await getUserById(user_id);
        if(!user) {
            return res.status(404).json({error: "User not found"});
        }
        res.status(200).json({user});
    } catch (err) {
        // Log the error message
        res.status(500).json({error: err?.message});
    }
}

// Controller for updating a user
const updateUserController = async (req, res) => {
    // Extract the user ID and user data from the request body
    const user_id = req.params.id;
    const { first_name, username, email, password_hash, country_name } = req.body;
    try {
        // Check if the user ID is missing
        if(!user_id) {
            return res.status(400).json({error: "Missing user ID"});
        }
        const user = await getUserById(user_id);
        if(!user) {
            return res.status(404).json({error: "User not found"});
        }
        // Update the user in the database
        const updatedUser = await updateUser(user_id, first_name, username, email, password_hash, country_name);
        if(!updatedUser) {
            return res.status(500).json({error: "Failed to update user"});
        }
        res.status(200).json({message: "Updated successfully", user: updatedUser});
    } catch (err) {
        res.status(500).json({error: err?.message});
    }
}

// Controller for deleting a user
const deleteUserController = async (req, res) => {
    // Extract the user ID from the request parameters
    const user_id = req.params.id;
    try {
        // Check if the user ID is missing
        if(!user_id) {
            return res.status(400).json({error: "Missing user ID"});
        }
        // Delete the user from the database
        const deletedUser = await deleteUser(user_id);
        if(!deletedUser) {
            return res.status(500).json({error: "Failed to delete user"});
        }
        res.status(200).json({message: "User deleted successfully"});
    } catch (err) {
        res.status(500).json({error: err?.message});
    }
}

//  Export the controllers
module.exports = {
    createUserController,
    getAllUsersController,
    getUserByIdController,
    updateUserController,
    deleteUserController,
};