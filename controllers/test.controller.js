// controllers/test.controller.js
const Test = require('../models/Test');

// Create a new test
exports.createTest = async (req, res) => {
  try {
    const { name, category, price } = req.body;
    const newTest = await Test.create({ name, category, price });
    res.status(201).json(newTest);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all tests
exports.getAllTests = async (req, res) => {
  try {
    const tests = await Test.findAll();
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a test
exports.updateTest = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price } = req.body;
    const test = await Test.findByPk(id);
    if (!test) return res.status(404).json({ message: 'Test not found' });

    test.name = name;
    test.category = category;
    test.price = price;

    await test.save();
    res.status(200).json({ message: 'Test updated successfully', test });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a test
exports.deleteTest = async (req, res) => {
  try {
    const { id } = req.params;
    const test = await Test.findByPk(id);
    if (!test) return res.status(404).json({ message: 'Test not found' });

    await test.destroy();
    res.status(200).json({ message: 'Test deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
