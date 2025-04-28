// // controllers/test.controller.js
// const Test = require('../models/Test');

// // Create a new test
// exports.createTest = async (req, res) => {
//   try {
//     const { name, category, price } = req.body;
//     const newTest = await Test.create({ name, category, price });
//     res.status(201).json(newTest);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// // Get all tests
// exports.getAllTests = async (req, res) => {
//   try {
//     const tests = await Test.findAll();
//     res.status(200).json(tests);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// // Update a test
// exports.updateTest = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, category, price } = req.body;
//     const test = await Test.findByPk(id);
//     if (!test) return res.status(404).json({ message: 'Test not found' });

//     test.name = name;
//     test.category = category;
//     test.price = price;

//     await test.save();
//     res.status(200).json({ message: 'Test updated successfully', test });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// // Delete a test
// exports.deleteTest = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const test = await Test.findByPk(id);
//     if (!test) return res.status(404).json({ message: 'Test not found' });

//     await test.destroy();
//     res.status(200).json({ message: 'Test deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };
const Joi = require('joi');
const { createTest, getAllTests, getTestById, updateTest, deleteTest } = require('../services/test.service');

// Joi schema for creating and updating test
const testSchema = Joi.object({
  name: Joi.string().min(3).required(),
  category: Joi.string().required(),
  price: Joi.number().greater(0).required(),
});

// POST: Create a new test
exports.createTest = async (req, res) => {
  // Validate the request body
  const { error } = testSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { name, category, price } = req.body;
  
  try {
    const newTest = await createTest(name, category, price);
    res.status(201).json(newTest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET: All tests
exports.getAllTests = async (req, res) => {
  try {
    const tests = await getAllTests();
    res.status(200).json(tests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET: Single test by ID
exports.getTestById = async (req, res) => {
  try {
    const test = await getTestById(req.params.id);
    if (!test) return res.status(404).json({ message: 'Test not found' });

    res.status(200).json(test);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT: Update test
exports.updateTest = async (req, res) => {
  // Validate the request body
  const { error } = testSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { name, category, price } = req.body;
  
  try {
    const test = await updateTest(req.params.id, name, category, price);
    res.status(200).json({ message: 'Test updated successfully', test });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE: Delete a test
exports.deleteTest = async (req, res) => {
  try {
    const result = await deleteTest(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
