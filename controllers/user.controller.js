// const { User } = require('../models');

// // GET: All users (admin-only recommended)
// exports.getAllUsers = async (req, res) => {
//     try {
//         const users = await User.findAll({
//             attributes: { exclude: ['password'] }
//         });
//         res.status(200).json(users);
//     } catch (err) {
//         res.status(500).json({ message: "Error fetching users", error: err.message });
//     }
// };

// // GET: Single user by ID
// exports.getUserById = async (req, res) => {
//     try {
//         const user = await User.findByPk(req.params.id, {
//             attributes: { exclude: ['password'] }
//         });
//         if (!user) return res.status(404).json({ message: "User not found" });

//         res.status(200).json(user);
//     } catch (err) {
//         res.status(500).json({ message: "Error fetching user", error: err.message });
//     }
// };

// // PUT: Update user
// exports.updateUser = async (req, res) => {
//     try {
//         const { name, email, role } = req.body;
//         const user = await User.findByPk(req.params.id);

//         if (!user) return res.status(404).json({ message: "User not found" });

//         // Update fields if provided
//         user.name = name ?? user.name;
//         user.email = email ?? user.email;
//         user.role = role ?? user.role;

//         await user.save();
//         res.status(200).json({ message: "User updated", user });
//     } catch (err) {
//         res.status(500).json({ message: "Error updating user", error: err.message });
//     }
// };

// // DELETE: Delete user
// exports.deleteUser = async (req, res) => {
//     try {
//         const user = await User.findByPk(req.params.id);
//         if (!user) return res.status(404).json({ message: "User not found" });

//         await user.destroy();
//         res.status(200).json({ message: "User deleted successfully" });
//     } catch (err) {
//         res.status(500).json({ message: "Error deleting user", error: err.message });
//     }
// };

const Joi = require('joi');
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../services/user.service');

// Joi schema for user update
const userUpdateSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    role: Joi.string().valid('admin', 'lab-technician', 'patient').optional()
});

// GET: All users (admin-only recommended)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET: Single user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// PUT: Update user
exports.updateUser = async (req, res) => {
    // Validate request body using Joi schema
    const { error } = userUpdateSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const { name, email, role } = req.body;
        const user = await updateUser(req.params.id, name, email, role);
        res.status(200).json({ message: "User updated", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE: Delete user
exports.deleteUser = async (req, res) => {
    try {
        const result = await deleteUser(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
