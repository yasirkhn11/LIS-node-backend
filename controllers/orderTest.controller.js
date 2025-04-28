// // controllers/orderTest.controller.js
// const OrderTest = require('../models/OrderTest');
// const Order = require('../models/Order');
// const Test = require('../models/Test');
// const Sample = require('../models/Sample');

// // Create a new OrderTest
// exports.createOrderTest = async (req, res) => {
//   try {
//     const { order_id, test_id, sample_id } = req.body;

//     // Validate if the order, test, and sample exist
//     const order = await Order.findByPk(order_id);
//     const test = await Test.findByPk(test_id);
//     const sample = await Sample.findByPk(sample_id);

//     if (!order) return res.status(404).json({ message: 'Order not found' });
//     if (!test) return res.status(404).json({ message: 'Test not found' });
//     if (!sample) return res.status(404).json({ message: 'Sample not found' });

//     const newOrderTest = await OrderTest.create({ order_id, test_id, sample_id });
//     res.status(201).json(newOrderTest);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// // Get all OrderTests
// exports.getAllOrderTests = async (req, res) => {
//   try {
//     const orderTests = await OrderTest.findAll({
//       include: [Order, Test, Sample], // Include related Order, Test, and Sample information
//     });
//     res.status(200).json(orderTests);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// // Get OrderTest by ID
// exports.getOrderTestById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const orderTest = await OrderTest.findByPk(id, {
//       include: [Order, Test, Sample], // Include related Order, Test, and Sample information
//     });

//     if (!orderTest) return res.status(404).json({ message: 'OrderTest not found' });
//     res.status(200).json(orderTest);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// // Update an OrderTest
// exports.updateOrderTest = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { order_id, test_id, sample_id } = req.body;

//     const orderTest = await OrderTest.findByPk(id);
//     if (!orderTest) return res.status(404).json({ message: 'OrderTest not found' });

//     // Validate if the order, test, and sample exist
//     const order = await Order.findByPk(order_id);
//     const test = await Test.findByPk(test_id);
//     const sample = await Sample.findByPk(sample_id);

//     if (!order) return res.status(404).json({ message: 'Order not found' });
//     if (!test) return res.status(404).json({ message: 'Test not found' });
//     if (!sample) return res.status(404).json({ message: 'Sample not found' });

//     orderTest.order_id = order_id;
//     orderTest.test_id = test_id;
//     orderTest.sample_id = sample_id;

//     await orderTest.save();
//     res.status(200).json({ message: 'OrderTest updated successfully', orderTest });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// // Delete an OrderTest
// exports.deleteOrderTest = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const orderTest = await OrderTest.findByPk(id);
//     if (!orderTest) return res.status(404).json({ message: 'OrderTest not found' });

//     await orderTest.destroy();
//     res.status(200).json({ message: 'OrderTest deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

const Joi = require('joi');
const { createOrderTest, getAllOrderTests, getOrderTestById, updateOrderTest, deleteOrderTest } = require('../services/orderTest.service');

// Joi schema for creating and updating an OrderTest
const orderTestSchema = Joi.object({
  order_id: Joi.number().required(),
  test_id: Joi.number().required(),
  sample_id: Joi.number().required(),
});

// POST: Create a new OrderTest
exports.createOrderTest = async (req, res) => {
  const { error } = orderTestSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { order_id, test_id, sample_id } = req.body;

  try {
    const newOrderTest = await createOrderTest(order_id, test_id, sample_id);
    res.status(201).json(newOrderTest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET: All OrderTests
exports.getAllOrderTests = async (req, res) => {
  try {
    const orderTests = await getAllOrderTests();
    res.status(200).json(orderTests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET: OrderTest by ID
exports.getOrderTestById = async (req, res) => {
  try {
    const orderTest = await getOrderTestById(req.params.id);
    res.status(200).json(orderTest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT: Update an OrderTest
exports.updateOrderTest = async (req, res) => {
  const { order_id, test_id, sample_id } = req.body;

  if (!order_id || !test_id || !sample_id) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const updatedOrderTest = await updateOrderTest(req.params.id, order_id, test_id, sample_id);
    res.status(200).json({ message: 'OrderTest updated successfully', orderTest: updatedOrderTest });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE: Delete an OrderTest
exports.deleteOrderTest = async (req, res) => {
  try {
    const result = await deleteOrderTest(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

