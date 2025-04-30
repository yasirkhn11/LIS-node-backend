

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models"); // Sequelize User model
const Patient = require("../models/Patient"); // Sequelize Patient model
require("dotenv").config();

// REGISTER
exports.register = async (req, res) => {
    try {
        const { name, email, password, role, dob, gender, phone, address } = req.body;

        // Check for existing user
        let user = await User.findOne({ where: { email } });
        if (user) return res.status(400).json({ message: "User already exists" });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        // If role is patient, create patient record
        if (role === 'patient') {
            await Patient.create({
                user_id: user.id,
                dob,
                gender,
                phone,
                address
            });
        }

        res.status(201).json({ message: "User registered successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ token });

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

