// routes/orderTest.router.js
const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../middlewares/authMiddleware');
const {
  createOrderTest,
  getAllOrderTests,
  getOrderTestById,
  updateOrderTest,
  deleteOrderTest,
} = require('../controllers/orderTest.controller');

// Routes
router.post('/', verifyToken, checkRole(['admin', 'lab_technician']), createOrderTest); // Admin or lab_technician can create OrderTest
router.get('/', verifyToken, checkRole(['admin', 'lab_technician']), getAllOrderTests); // Admin or lab_technician can get all OrderTests
router.get('/:id', verifyToken, checkRole(['admin', 'lab_technician']), getOrderTestById); // Admin or lab_technician can get OrderTest by ID
router.put('/:id', verifyToken, checkRole(['admin', 'lab_technician']), updateOrderTest); // Admin or lab_technician can update OrderTest
router.delete('/:id', verifyToken, checkRole(['admin']), deleteOrderTest); // Only admin can delete OrderTest

module.exports = router;
