const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken, checkRole } = require('../middleware/auth.middleware');

// All routes below require authentication
router.use(verifyToken);

// GET all users (admin only)
router.get('/', checkRole(['admin']), userController.getAllUsers);

// GET a single user by ID (admin or self)
router.get('/:id', userController.getUserById);

// UPDATE a user by ID (admin or self)
router.put('/:id', userController.updateUser);

// DELETE a user by ID (admin only)
router.delete('/:id', checkRole(['admin']), userController.deleteUser);

module.exports = router;
