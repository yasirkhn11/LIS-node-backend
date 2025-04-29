// // controllers/order.controller.js
// const Order = require('../models/Order');
// const Patient = require('../models/Patient');

// // Create a new order
// exports.createOrder = async (req, res) => {
//   try {
//     const { patient_id, status } = req.body;

//     // Validate if the patient exists
//     const patient = await Patient.findByPk(patient_id);
//     if (!patient) {
//       return res.status(404).json({ message: 'Patient not found' });
//     }

//     const newOrder = await Order.create({ patient_id, status });
//     res.status(201).json(newOrder);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// // Get all orders
// exports.getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.findAll({
//       include: Patient, // Include patient information
//     });
//     res.status(200).json(orders);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// // Get an order by ID
// exports.getOrderById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const order = await Order.findByPk(id, {
//       include: Patient, // Include patient information
//     });
//     if (!order) return res.status(404).json({ message: 'Order not found' });
//     res.status(200).json(order);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// // Update an order
// exports.updateOrder = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     const order = await Order.findByPk(id);
//     if (!order) return res.status(404).json({ message: 'Order not found' });

//     order.status = status || order.status;
//     await order.save();
//     res.status(200).json({ message: 'Order updated successfully', order });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// // Delete an order
// exports.deleteOrder = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const order = await Order.findByPk(id);
//     if (!order) return res.status(404).json({ message: 'Order not found' });

//     await order.destroy();
//     res.status(200).json({ message: 'Order deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// const Joi = require('joi');
// const { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } = require('../services/order.service');

// // Joi schema for creating and updating an order
// const orderSchema = Joi.object({
//   patient_id: Joi.number().required(),
//   status: Joi.string().valid('pending', 'completed', 'in-progress').required(),
// });

// // POST: Create a new order
// exports.createOrder = async (req, res) => {
//   const { error } = orderSchema.validate(req.body);
//   if (error) return res.status(400).json({ message: error.details[0].message });

//   const { patient_id, status } = req.body;

//   try {
//     const newOrder = await createOrder(patient_id, status);
//     res.status(201).json(newOrder);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // GET: All orders
// exports.getAllOrders = async (req, res) => {
//   try {
//     const orders = await getAllOrders();
//     res.status(200).json(orders);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // GET: Single order by ID
// exports.getOrderById = async (req, res) => {
//   try {
//     const order = await getOrderById(req.params.id);
//     res.status(200).json(order);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // PUT: Update an order
// exports.updateOrder = async (req, res) => {
//   const { status } = req.body;

//   if (!status || !['pending', 'completed', 'in-progress'].includes(status)) {
//     return res.status(400).json({ message: 'Invalid status value' });
//   }

//   try {
//     const updatedOrder = await updateOrder(req.params.id, status);
//     res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // DELETE: Delete an order
// exports.deleteOrder = async (req, res) => {
//   try {
//     const result = await deleteOrder(req.params.id);
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const Joi = require('joi');
// const { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } = require('../services/order.service');

// // Joi schema for creating an order
// const orderSchema = Joi.object({
//   patient_id: Joi.number().required(),
//   test_ids: Joi.array().items(Joi.number()).required()  // Accept test_ids array
// });

// // POST: Create a new order with multiple tests
// exports.createOrder = async (req, res) => {
//   const { error } = orderSchema.validate(req.body);
//   if (error) return res.status(400).json({ message: error.details[0].message });

//   const { patient_id, test_ids } = req.body;

//   try {
//     const newOrder = await createOrder(patient_id, test_ids);
//     res.status(201).json({ message: 'Order created successfully', order: newOrder });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // GET: Fetch all orders
// exports.getAllOrders = async (req, res) => {
//   try {
//     const orders = await getAllOrders();
//     res.status(200).json(orders);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // GET: Fetch single order by ID
// exports.getOrderById = async (req, res) => {
//   try {
//     const order = await getOrderById(req.params.id);
//     res.status(200).json(order);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // PUT: Update an order's status
// exports.updateOrder = async (req, res) => {
//   const { status } = req.body;

//   if (!status || !['pending', 'in_progress', 'completed'].includes(status)) {
//     return res.status(400).json({ message: 'Invalid status value' });
//   }

//   try {
//     const updatedOrder = await updateOrder(req.params.id, status);
//     res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // DELETE: Delete an order
// exports.deleteOrder = async (req, res) => {
//   try {
//     const result = await deleteOrder(req.params.id);
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const Joi = require('joi');
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrdersByPatientId
} = require('../services/order.service');

// Joi schema for creating an order
const orderSchema = Joi.object({
  patient_id: Joi.number().required(),
  test_ids: Joi.array().items(Joi.number()).required()  // Accept test_ids array
});

// POST: Create a new order with multiple tests
exports.createOrder = async (req, res) => {
  const { error } = orderSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { patient_id, test_ids } = req.body;

  try {
    const newOrder = await createOrder(patient_id, test_ids);
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET: Fetch all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET: Fetch orders for logged-in patient
exports.getMyOrders = async (req, res) => {
  try {
    const patientId = req.user.id; // req.user populated by verifyToken middleware
    const orders = await getOrdersByPatientId(patientId);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET: Fetch single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await getOrderById(req.params.id);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT: Update an order's status
exports.updateOrder = async (req, res) => {
  const { status } = req.body;

  if (!status || !['pending', 'in_progress', 'completed'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const updatedOrder = await updateOrder(req.params.id, status);
    res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE: Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const result = await deleteOrder(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
