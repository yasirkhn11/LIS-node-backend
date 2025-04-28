const { Patient } = require('../models');

// Get all patients
async function getAllPatients() {
    try {
        return await Patient.findAll();
    } catch (err) {
        throw new Error("Error fetching patients: " + err.message);
    }
}

// Get patient by ID
async function getPatientById(id) {
    try {
        return await Patient.findByPk(id);
    } catch (err) {
        throw new Error("Error fetching patient: " + err.message);
    }
}

// Update patient
async function updatePatient(id, dob, gender, phone, address) {
    try {
        const patient = await Patient.findByPk(id);
        if (!patient) throw new Error("Patient not found");

        patient.dob = dob ?? patient.dob;
        patient.gender = gender ?? patient.gender;
        patient.phone = phone ?? patient.phone;
        patient.address = address ?? patient.address;

        await patient.save();
        return patient;
    } catch (err) {
        throw new Error("Error updating patient: " + err.message);
    }
}

// Delete patient
async function deletePatient(id) {
    try {
        const patient = await Patient.findByPk(id);
        if (!patient) throw new Error("Patient not found");

        await patient.destroy();
        return { message: "Patient deleted successfully" };
    } catch (err) {
        throw new Error("Error deleting patient: " + err.message);
    }
}

module.exports = { getAllPatients, getPatientById, updatePatient, deletePatient };
