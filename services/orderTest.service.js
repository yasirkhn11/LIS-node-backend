// services/orderTest.service.js
const { OrderTest, Order, Test, Sample } = require('../models');

// Create a new OrderTest
async function createOrderTest(order_id, test_id, sample_id) {
  try {
    const order = await Order.findByPk(order_id);
    const test = await Test.findByPk(test_id);
    const sample = await Sample.findByPk(sample_id);

    if (!order || !test || !sample) {
      throw new Error('Order, Test, or Sample not found');
    }

    return await OrderTest.create({ order_id, test_id, sample_id });
  } catch (err) {
    throw new Error(err.message);
  }
}

// Get all OrderTests
async function getAllOrderTests() {
  try {
    return await OrderTest.findAll({
      include: [Order, Test, Sample], // Include related Order, Test, and Sample information
    });
  } catch (err) {
    throw new Error("Error fetching OrderTests: " + err.message);
  }
}

// Get OrderTest by ID
async function getOrderTestById(id) {
  try {
    const orderTest = await OrderTest.findByPk(id, {
      include: [Order, Test, Sample], // Include related Order, Test, and Sample information
    });

    if (!orderTest) throw new Error('OrderTest not found');
    return orderTest;
  } catch (err) {
    throw new Error(err.message);
  }
}

// Update an OrderTest
async function updateOrderTest(id, order_id, test_id, sample_id) {
  try {
    const orderTest = await OrderTest.findByPk(id);
    if (!orderTest) throw new Error('OrderTest not found');

    const order = await Order.findByPk(order_id);
    const test = await Test.findByPk(test_id);
    const sample = await Sample.findByPk(sample_id);

    if (!order || !test || !sample) {
      throw new Error('Order, Test, or Sample not found');
    }

    orderTest.order_id = order_id;
    orderTest.test_id = test_id;
    orderTest.sample_id = sample_id;

    await orderTest.save();
    return orderTest;
  } catch (err) {
    throw new Error(err.message);
  }
}

// Delete an OrderTest
async function deleteOrderTest(id) {
  try {
    const orderTest = await OrderTest.findByPk(id);
    if (!orderTest) throw new Error('OrderTest not found');

    await orderTest.destroy();
    return { message: 'OrderTest deleted successfully' };
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = { createOrderTest, getAllOrderTests, getOrderTestById, updateOrderTest, deleteOrderTest };
