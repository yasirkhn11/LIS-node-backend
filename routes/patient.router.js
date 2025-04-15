const express = require('express');
const router = express.Router();
const { Patient } = require('../models');
const { verifyToken, checkRole } = require('../middlewares/authMiddleware');

// ✅ Create a new patient
router.post('/', verifyToken, checkRole(['admin', 'receptionist']), async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get all patients with pagination & filtering
router.get('/', verifyToken, checkRole(['admin', 'receptionist']), async (req, res) => {
  try {
    const { page = 1, limit = 10, name } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (name) where.name = name;

    const patients = await Patient.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      total: patients.count,
      page: parseInt(page),
      pages: Math.ceil(patients.count / limit),
      data: patients.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get a single patient
router.get('/:id', verifyToken, checkRole(['admin', 'receptionist']), async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update a patient
router.put('/:id', verifyToken, checkRole(['admin', 'receptionist']), async (req, res) => {
  try {
    const updated = await Patient.update(req.body, { where: { id: req.params.id } });
    res.json({ updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete a patient
router.delete('/:id', verifyToken, checkRole(['admin']), async (req, res) => {
  try {
    await Patient.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Patient deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
