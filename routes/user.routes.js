const express = require("express");
const { verifyToken, checkRole } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/dashboard", verifyToken, checkRole(["admin", "technician"]), (req, res) => {
    res.json({ message: "Welcome to the dashboard!", user: req.user });
});

module.exports = router;
