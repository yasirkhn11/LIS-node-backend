// routes/test.router.js
const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../middlewares/authMiddleware');
const {
  createTest,
  getAllTests,
  updateTest,
  deleteTest,
} = require('../controllers/test.controller');

// Routes
router.post('/', verifyToken, checkRole(['admin']), createTest);
router.get('/', verifyToken, checkRole(['admin', 'lab_technician','patient']), getAllTests);
router.put('/:id', verifyToken, checkRole(['admin']), updateTest);
router.delete('/:id', verifyToken, checkRole(['admin']), deleteTest);

module.exports = router;
