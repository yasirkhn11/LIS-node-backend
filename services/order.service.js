// // services/order.service.js
// const { Order } = require('../models');
// const { Patient } = require('../models');

// // Create a new order
// async function createOrder(patient_id, status) {
//   try {
//     const patient = await Patient.findByPk(patient_id);
//     if (!patient) throw new Error("Patient not found");

//     return await Order.create({ patient_id, status });
//   } catch (err) {
//     throw new Error(err.message);
//   }
// }

// // Get all orders
// async function getAllOrders() {
//   try {
//     return await Order.findAll({
//       include: [Patient], // Include patient information
//     });
//   } catch (err) {
//     throw new Error("Error fetching orders: " + err.message);
//   }
// }

// // Get an order by ID
// async function getOrderById(id) {
//   try {
//     const order = await Order.findByPk(id, {
//       include: [Patient], // Include patient information
//     });
//     if (!order) throw new Error("Order not found");
//     return order;
//   } catch (err) {
//     throw new Error(err.message);
//   }
// }

// // Update an order
// async function updateOrder(id, status) {
//   try {
//     const order = await Order.findByPk(id);
//     if (!order) throw new Error("Order not found");

//     order.status = status ?? order.status;
//     await order.save();
//     return order;
//   } catch (err) {
//     throw new Error(err.message);
//   }
// }

// // Delete an order
// async function deleteOrder(id) {
//   try {
//     const order = await Order.findByPk(id);
//     if (!order) throw new Error("Order not found");

//     await order.destroy();
//     return { message: "Order deleted successfully" };
//   } catch (err) {
//     throw new Error(err.message);
//   }
// }

// module.exports = { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder };

const { Order, Test, OrderTest } = require('../models');
const { Patient } = require('../models');

// Create a new order with multiple tests
async function createOrder(patient_id, test_ids) {
  try {
    const patient = await Patient.findByPk(patient_id);
    if (!patient) throw new Error("Patient not found");

    // Create a new order
    const order = await Order.create({
      patient_id,
      status: 'pending',
    });

    // Create order-test associations
    for (let test_id of test_ids) {
      const test = await Test.findByPk(test_id);
      if (!test) throw new Error(`Test with ID ${test_id} not found`);

      // Create an association between Order and Test
      await OrderTest.create({
        order_id: order.id,
        test_id: test.id,
      });
    }

    return order; // Return the created order
  } catch (err) {
    throw new Error(err.message);
  }
}

// Get all orders with associated patient and tests
async function getAllOrders() {
  try {
    return await Order.findAll({
      include: [
        { model: Patient }, // Include patient information
        { model: Test, through: { model: OrderTest } } // Include tests through OrderTest
      ],
    });
  } catch (err) {
    throw new Error("Error fetching orders: " + err.message);
  }
}

// Get a specific order by ID, with patient and tests
async function getOrderById(id) {
  try {
    const order = await Order.findByPk(id, {
      include: [
        { model: Patient }, // Include patient information
        { model: Test, through: { model: OrderTest } } // Include tests through OrderTest
      ],
    });
    if (!order) throw new Error("Order not found");
    return order;
  } catch (err) {
    throw new Error(err.message);
  }
}

// Update an order's status
async function updateOrder(id, status) {
  try {
    const order = await Order.findByPk(id);
    if (!order) throw new Error("Order not found");

    order.status = status ?? order.status;
    await order.save();
    return order;
  } catch (err) {
    throw new Error(err.message);
  }
}

// Delete an order
async function deleteOrder(id) {
  try {
    const order = await Order.findByPk(id);
    if (!order) throw new Error("Order not found");

    await order.destroy();
    return { message: "Order deleted successfully" };
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder };
