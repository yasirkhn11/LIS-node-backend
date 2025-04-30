

const Joi = require('joi');
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrdersByPatientId
} = require('../services/order.service');
const { Patient } = require('../models'); // Import the Patient model if not already

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
    res.status(201).json({ message: 'Order created successfully', order: newOrder  });
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


exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    // Step 1: Get patient by user_id
    const patient = await Patient.findOne({ where: { user_id: userId } });

    if (!patient) {
      return res.status(404).json({ message: 'No patient profile found for this user' });
    }

    // Step 2: Get orders by actual patient.id
    const orders = await getOrdersByPatientId(patient.id);
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
