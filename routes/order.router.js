// routes/order.router.js
const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../middlewares/authMiddleware');
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require('../controllers/order.controller');
router.get('/my-orders', verifyToken, checkRole(['patient']), require('../controllers/order.controller').getMyOrders);


// Routes
router.post('/', verifyToken, checkRole(['admin', 'lab_technician','patient']), createOrder); // Admin or lab_technician can create orders
router.get('/', verifyToken, checkRole(['admin', 'lab_technician']), getAllOrders); // Admin or lab_technician can view all orders
router.get('/:id', verifyToken, checkRole(['admin', 'lab_technician']), getOrderById); // Admin or lab_technician can view an order by ID
router.put('/:id', verifyToken, checkRole(['admin', 'lab_technician']), updateOrder); // Admin or lab_technician can update orders
router.delete('/:id', verifyToken, checkRole(['admin']), deleteOrder); // Only admin can delete orders

module.exports = router;
