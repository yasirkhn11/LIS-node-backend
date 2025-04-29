const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../middlewares/authMiddleware');
const {
  createResult,
  getAllResults,
  getResultById,
  updateResult,
  deleteResult
} = require('../controllers/result.controller');

// Routes (Only admin and lab_technician can manage results)
router.post('/', verifyToken, checkRole(['admin', 'lab_technician']), createResult);
router.get('/', verifyToken, checkRole(['admin', 'lab_technician']), getAllResults);
router.get('/:id', verifyToken, checkRole(['admin', 'lab_technician']), getResultById);
router.put('/:id', verifyToken, checkRole(['admin', 'lab_technician']), updateResult);
router.delete('/:id', verifyToken, checkRole(['admin']), deleteResult);

module.exports = router;
