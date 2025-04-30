
const jwt = require("jsonwebtoken");
require("dotenv").config();

// **Verify JWT Token**
exports.verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const cleanToken = token.replace("Bearer ", "").trim();
        const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("JWT verification failed:", error.message);
        res.status(400).json({ message: "Invalid Token" });
    }
};

// **Check User Role**
exports.checkRole = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
    }
    next();
};
