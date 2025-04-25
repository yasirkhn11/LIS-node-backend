// routes/sample.router.js
const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../middlewares/authMiddleware');
const {
  createSample,
  getAllSamples,
  getSampleById,
  updateSample,
  deleteSample,
} = require('../controllers/sample.controller');

// Routes
router.post('/', verifyToken, checkRole(['admin', 'lab_technician']), createSample); // Admin or lab_technician can create Sample
router.get('/', verifyToken, checkRole(['admin', 'lab_technician']), getAllSamples); // Admin or lab_technician can get all Samples
router.get('/:id', verifyToken, checkRole(['admin', 'lab_technician']), getSampleById); // Admin or lab_technician can get Sample by ID
router.put('/:id', verifyToken, checkRole(['admin', 'lab_technician']), updateSample); // Admin or lab_technician can update Sample
router.delete('/:id', verifyToken, checkRole(['admin']), deleteSample); // Only admin can delete Sample

module.exports = router;
