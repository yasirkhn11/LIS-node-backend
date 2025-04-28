// // In patient.controller.js
// const { Patient } = require('../models');

// exports.getAllPatients = async (req, res) => {
//     try {
//         const patients = await Patient.findAll();
//         res.status(200).json(patients);
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error });
//     }
// };
// // In patient.controller.js
// exports.updatePatient = async (req, res) => {
//     try {
//         const { id } = req.params; // Patient ID from URL
//         const { dob, gender, phone, address } = req.body; // Data to update

//         const patient = await Patient.findByPk(id);
//         if (!patient) return res.status(404).json({ message: "Patient not found" });

//         // Update patient record
//         patient.dob = dob;
//         patient.gender = gender;
//         patient.phone = phone;
//         patient.address = address;

//         await patient.save(); // Save the updated patient record
//         res.status(200).json({ message: "Patient updated successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error });
//     }
// };
// // In patient.controller.js
// exports.deletePatient = async (req, res) => {
//     try {
//         const { id } = req.params; // Patient ID from URL
//         const patient = await Patient.findByPk(id);
//         if (!patient) return res.status(404).json({ message: "Patient not found" });

//         await patient.destroy(); // Delete the patient record
//         res.status(200).json({ message: "Patient deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error });
//     }
// };
const Joi = require('joi');
const { getAllPatients, getPatientById, updatePatient, deletePatient } = require('../services/patient.service');

// Joi schema for patient update
const patientUpdateSchema = Joi.object({
    dob: Joi.date().iso().optional(),
    gender: Joi.string().valid('male', 'female', 'other').optional(),
    phone: Joi.string().pattern(/^[0-9]{10}$/).optional(), // Example phone number validation
    address: Joi.string().optional(),
});

// GET: All patients
exports.getAllPatients = async (req, res) => {
    try {
        const patients = await getAllPatients();
        res.status(200).json(patients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET: Single patient by ID
exports.getPatientById = async (req, res) => {
    try {
        const patient = await getPatientById(req.params.id);
        if (!patient) return res.status(404).json({ message: "Patient not found" });

        res.status(200).json(patient);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// PUT: Update patient
exports.updatePatient = async (req, res) => {
    // Validate request body using Joi schema
    const { error } = patientUpdateSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { dob, gender, phone, address } = req.body;

    try {
        const patient = await updatePatient(req.params.id, dob, gender, phone, address);
        res.status(200).json({ message: "Patient updated successfully", patient });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE: Delete patient
exports.deletePatient = async (req, res) => {
    try {
        const result = await deletePatient(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

