// In patient.controller.js
const { Patient } = require('../models');

exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.findAll();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
// In patient.controller.js
exports.updatePatient = async (req, res) => {
    try {
        const { id } = req.params; // Patient ID from URL
        const { dob, gender, phone, address } = req.body; // Data to update

        const patient = await Patient.findByPk(id);
        if (!patient) return res.status(404).json({ message: "Patient not found" });

        // Update patient record
        patient.dob = dob;
        patient.gender = gender;
        patient.phone = phone;
        patient.address = address;

        await patient.save(); // Save the updated patient record
        res.status(200).json({ message: "Patient updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
// In patient.controller.js
exports.deletePatient = async (req, res) => {
    try {
        const { id } = req.params; // Patient ID from URL
        const patient = await Patient.findByPk(id);
        if (!patient) return res.status(404).json({ message: "Patient not found" });

        await patient.destroy(); // Delete the patient record
        res.status(200).json({ message: "Patient deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
