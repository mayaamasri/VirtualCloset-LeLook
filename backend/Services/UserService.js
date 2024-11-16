const User = require("../Models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const Country = require("../Models/Countries");

const createUser = async (firstname, username, email, password, country_name ) => {
    try {
        const existingUsername = await User.findOne({ where: {username: username}});
        if(existingUsername){
            throw new Error(`Username ${username} already exists`);
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const country = await Country.findOne({ where: {country_name: country_name}});

        if(!country){
            throw new Error(`Country ${country_name} not found`);
        }
        const newUser = await User.create({
            first_name: firstname,
            username: username,
            email: email,
            password_hash: hashedPassword,
            country_id: country.country_id
        });
        return newUser;
    }
    catch(error){
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
    }
};

const getAllUsers = async() => {
    try{
        const users = await User.findAll();
        return users;
    } catch(error){
        console.error('Error getting users:', error);
        throw new Error('Failed to get users');
    }
};

const getUserById = async(id) => {
    try {
        const user = await User.findByPk(id);
        if(user){
            return user.toJSON();
        }
        return "User not found";
    } catch(error){
        console.error('Error getting user by ID: ', error);
        throw new Error('Failed to get user');
    }
};

const getUserByEmail = async(email) => {
    try{
        const user = await User.findOne({ where: {email: email}});
        return user || null;
    } catch (error){
        throw new Error(`Error in finding the user with email ${email}`);
    }
};

const updateUser = async (id, firstname, username, email, password, country_name) => {
    try {
        const user = await User.findByPk(id);
        if(!user) throw new Error(`User with ID ${id} not found`);

        const hashedPass = await bcrypt.hash(password, saltRounds);

        if(country_name){
            const country = await Country.findOne({ where: {country_name: country_name}});
            if(!country){
                throw new Error(`Country ${country_name} not found`);
            }
            user.country_id = country.country_id;
        }
        const updated = await User.update({
            first_name: firstname,
            username: username,
            email: email,
            password_hash: hashedPass,
            country_id: user.country_id
        }, {
            where: {user_id: id}
        });
        return updated;
    } catch(error){
        console.error('Error updating user:', error);
        throw new Error('Failed to update user');
    }
};

const deleteUser = async(id) => {
    try{
        const user = await User.findByPk(id);
        if(user){
            const deleteUser = await user.destroy();
            return deleteUser;
        }
        throw new Error(`User with ID ${id} not found`);
    } catch(error){
        console.error('Error deleting user: ', error);
        throw new Error('Failed to delete user');
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser
}