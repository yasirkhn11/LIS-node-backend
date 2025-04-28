// services/test.service.js
const { Test } = require('../models');

// Create a new test
async function createTest(name, category, price) {
  try {
    return await Test.create({ name, category, price });
  } catch (err) {
    throw new Error("Error creating test: " + err.message);
  }
}

// Get all tests
async function getAllTests() {
  try {
    return await Test.findAll();
  } catch (err) {
    throw new Error("Error fetching tests: " + err.message);
  }
}

// Get a test by ID
async function getTestById(id) {
  try {
    return await Test.findByPk(id);
  } catch (err) {
    throw new Error("Error fetching test: " + err.message);
  }
}

// Update a test
async function updateTest(id, name, category, price) {
  try {
    const test = await Test.findByPk(id);
    if (!test) throw new Error("Test not found");

    test.name = name ?? test.name;
    test.category = category ?? test.category;
    test.price = price ?? test.price;

    await test.save();
    return test;
  } catch (err) {
    throw new Error("Error updating test: " + err.message);
  }
}

// Delete a test
async function deleteTest(id) {
  try {
    const test = await Test.findByPk(id);
    if (!test) throw new Error("Test not found");

    await test.destroy();
    return { message: "Test deleted successfully" };
  } catch (err) {
    throw new Error("Error deleting test: " + err.message);
  }
}

module.exports = { createTest, getAllTests, getTestById, updateTest, deleteTest };
