// const express = require("express");
// const { verifyToken, checkRole } = require("../middlewares/authMiddleware");

// const router = express.Router();

// router.get("/dashboard", verifyToken, checkRole(['admin', 'lab_technician', 'patient']), (req, res) => {
//     res.json({ message: "Welcome to the dashboard!", user: req.user });
// });

// module.exports = router;

const express = require("express");
const { verifyToken, checkRole } = require("../middlewares/authMiddleware");
const { getAllUsers, getUserById, updateUser, deleteUser } = require("../controllers/user.controller");

const router = express.Router();

// No POST here because users register themselves!

router.get('/', verifyToken, checkRole(['admin']), getAllUsers);
router.get('/:id', verifyToken, checkRole(['admin']), getUserById);
router.put('/:id', verifyToken, checkRole(['admin', 'lab_technician', 'patient']), updateUser);
router.delete('/:id', verifyToken, checkRole(['admin']), deleteUser);

module.exports = router;

