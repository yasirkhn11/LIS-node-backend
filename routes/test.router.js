const express = require('express');
const router = express.Router();
const { Test } = require('../models');
const { verifyToken, checkRole } = require('../middlewares/authMiddleware');

// ✅ Create a new test
router.post('/', verifyToken, checkRole(['admin']), async (req, res) => {
  try {
    const test = await Test.create(req.body);
    res.status(201).json(test);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get all tests with pagination & filtering
router.get('/', verifyToken, checkRole(['admin', 'receptionist']), async (req, res) => {
  try {
    const { page = 1, limit = 10, name } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (name) where.name = name;

    const tests = await Test.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      total: tests.count,
      page: parseInt(page),
      pages: Math.ceil(tests.count / limit),
      data: tests.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get a single test
router.get('/:id', verifyToken, checkRole(['admin', 'receptionist']), async (req, res) => {
  try {
    const test = await Test.findByPk(req.params.id);
    if (!test) return res.status(404).json({ error: 'Test not found' });
    res.json(test);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update a test
router.put('/:id', verifyToken, checkRole(['admin']), async (req, res) => {
  try {
    const updated = await Test.update(req.body, { where: { id: req.params.id } });
    res.json({ updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete a test
router.delete('/:id', verifyToken, checkRole(['admin']), async (req, res) => {
  try {
    await Test.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Test deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
