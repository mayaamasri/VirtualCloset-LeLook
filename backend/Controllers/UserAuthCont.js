const bcrypt = require("bcrypt");
const User = require("../Models/User");
require("dotenv").config();
const { createSecretToken } = require("../util/SecretToken");

const userAuthController = async (req, res) => {
    const { email, password_hash } = req.body;
    try {
        if(!email || !password_hash) {
            return res.status(400).json({error: "Missing required fields"});
        }
        const user = await User.findOne({ where: {email: email}});
        if(!user) {
            return res.status(404).json({error: "Invalid email or password"});
        }
        const passwordMatch = await bcrypt.compare(password_hash, user.password_hash);
        if(!passwordMatch) {
            return res.status(404).json({error: "Invalid email or password"});
        }
        const token = createSecretToken(user.user_id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
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