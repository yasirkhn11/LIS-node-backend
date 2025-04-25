const express = require("express");
const { verifyToken, checkRole } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/dashboard", verifyToken, checkRole(['admin', 'lab_technician', 'patient']), (req, res) => {
    res.json({ message: "Welcome to the dashboard!", user: req.user });
});

module.exports = router;
