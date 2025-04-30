
async function createOrder(patient_id, test_ids) {
  try {
    // Check if patient exists
    const patient = await Patient.findByPk(patient_id);
    if (!patient) throw new Error("Patient not found");

    // Create order
    const order = await Order.create({
      patient_id,
      status: 'pending',
    });

    // Create entries in OrderTest
    for (let test_id of test_ids) {
      const test = await Test.findByPk(test_id);
      if (!test) throw new Error(`Test with ID ${test_id} not found`);
      await OrderTest.create({ order_id: order.id, test_id });
    }

    // Fetch test details
    const tests = await Test.findAll({
      where: { id: test_ids },
      attributes: ['id', 'name', 'price'] // Select only required fields
    });

    // Return full response
    return {
      id: order.id,
      patient_id: order.patient_id,
      status: order.status,
      ordered_at: order.ordered_at,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      tests: tests
    };

  } catch (err) {
    throw new Error(err.message);
  }
}


// Get all orders with associated patient and tests
async function getAllOrders() {
  try {
    return await Order.findAll({
      include: [
        { model: Patient },
        { model: Test, through: { model: OrderTest } }
      ],
    });
  } catch (err) {
    throw new Error("Error fetching orders: " + err.message);
  }
}

// Get orders for a specific patient
async function getOrdersByPatientId(patientId) {
  try {
    return await Order.findAll({
      where: { patient_id: patientId },
      include: [
        { model: Patient },
        { model: Test, through: { model: OrderTest } }
      ],
    });
  } catch (err) {
    throw new Error("Error fetching patient orders: " + err.message);
  }
}

// Get a specific order by ID
async function getOrderById(id) {
  try {
    const order = await Order.findByPk(id, {
      include: [
        { model: Patient },
        { model: Test, through: { model: OrderTest } }
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

module.exports = {
  createOrder,
  getAllOrders,
  getOrdersByPatientId,
  getOrderById,
  updateOrder,
  deleteOrder
};

