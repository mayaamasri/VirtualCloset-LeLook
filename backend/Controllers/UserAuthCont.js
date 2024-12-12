const bcrypt = require("bcrypt");
const User = require("../Models/User");
require("dotenv").config();
const { createSecretToken } = require("../util/SecretToken");

// Controller for user authentication
const userAuthController = async (req, res) => {
    // Extract the email and password from the request body
    const { email, password_hash } = req.body;
    try {
        // Check if the email or password is missing
        if(!email || !password_hash) {
            return res.status(400).json({error: "Missing required fields"});
        }
        // Find the user by email
        const user = await User.findOne({ where: {email: email}});
        if(!user) {
            return res.status(404).json({error: "Invalid email or password"});
        }
        // Compare the password hash with the stored hash
        const passwordMatch = await bcrypt.compare(password_hash, user.password_hash);
        if(!passwordMatch) {
            return res.status(404).json({error: "Invalid email or password"});
        }
        // Create a secret token for the user
        const token = createSecretToken(user.user_id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        // Return a success response
        res.status(200).json({
            message: "User logged in successfully", 
            token,
            user: {
                user_id: user.user_id,
                email: user.email,
                first_name: user.first_name
            }
        });
    } catch (err) {
        res.status(500).json({error: err.message}); 
    }
}

module.exports = userAuthController;