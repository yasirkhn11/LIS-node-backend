const { User } = require('../models');

// Get all users
async function getAllUsers() {
    try {
        return await User.findAll({
            attributes: { exclude: ['password'] }
        });
    } catch (err) {
        throw new Error("Error fetching users: " + err.message);
    }
}

// Get a user by ID
async function getUserById(id) {
    try {
        return await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });
    } catch (err) {
        throw new Error("Error fetching user: " + err.message);
    }
}

// Update user
async function updateUser(id, name, email, role) {
    try {
        const user = await User.findByPk(id);
        if (!user) throw new Error("User not found");

        user.name = name ?? user.name;
        user.email = email ?? user.email;
        user.role = role ?? user.role;

        await user.save();
        return user;
    } catch (err) {
        throw new Error("Error updating user: " + err.message);
    }
}

// Delete user
async function deleteUser(id) {
    try {
        const user = await User.findByPk(id);
        if (!user) throw new Error("User not found");

        await user.destroy();
        return { message: "User deleted successfully" };
    } catch (err) {
        throw new Error("Error deleting user: " + err.message);
    }
}

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };
