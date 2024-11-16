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

const createUserController = async (req, res) => {
    const { first_name, username, email, password_hash, country_name } = req.body;
    try {
        if(!first_name || !username || !email || !password_hash || !country_name) {
            return res.status(400).json({error: "Missing required fields"});
        }
        const user = await createUser(first_name, username, email, password_hash, country_name);
        if(!user) {
            return res.status(500).json({error: "Failed to create user"});
        }
        res.status(201).json({message: "New User Created", user: user});
    } catch (e) {
        res.status(400).json({error: err?.message});
    }
}

const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json({users});
    } catch (err) {
        res.status(500).json({error: err?.message});
    }
}

const getUserByIdController = async (req, res) => {
    const user_id = req.params.id;
    try {
        if(!user_id) {
            return res.status(400).json({error: "Missing user ID"});
        }
        const user = await getUserById(user_id);
        if(!user) {
            return res.status(404).json({error: "User not found"});
        }
        res.status(200).json({user});
    } catch (err) {
        res.status(500).json({error: err?.message});
    }
}

const updateUserController = async (req, res) => {
    const user_id = req.params.id;
    const { first_name, username, email, password_hash, country_name } = req.body;
    try {
        if(!user_id) {
            return res.status(400).json({error: "Missing user ID"});
        }
        const user = await getUserById(user_id);
        if(!user) {
            return res.status(404).json({error: "User not found"});
        }
        const updatedUser = await updateUser(user_id, first_name, username, email, password_hash, country_name);
        if(!updatedUser) {
            return res.status(500).json({error: "Failed to update user"});
        }
        res.status(200).json({message: "Updated successfully", user: updatedUser});
    } catch (err) {
        res.status(500).json({error: err?.message});
    }
}

const deleteUserController = async (req, res) => {
    const user_id = req.params.id;
    try {
        if(!user_id) {
            return res.status(400).json({error: "Missing user ID"});
        }
        const deletedUser = await deleteUser(user_id);
        if(!deletedUser) {
            return res.status(500).json({error: "Failed to delete user"});
        }
        res.status(200).json({message: "User deleted successfully"});
    } catch (err) {
        res.status(500).json({error: err?.message});
    }
}

module.exports = {
    createUserController,
    getAllUsersController,
    getUserByIdController,
    updateUserController,
    deleteUserController,
};