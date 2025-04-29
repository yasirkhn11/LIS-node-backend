const Joi = require('joi');
const {
  createResult,
  getAllResults,
  getResultById,
  updateResult,
  deleteResult
} = require('../services/result.service');

const resultSchema = Joi.object({
  sample_id: Joi.number().required(),
  result_data: Joi.string().required(),
  uploaded_by: Joi.number().required()
});

// Create
exports.createResult = async (req, res) => {
  const { error } = resultSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const result = await createResult(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all
exports.getAllResults = async (req, res) => {
  try {
    const results = await getAllResults();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get by ID
exports.getResultById = async (req, res) => {
  try {
    const result = await getResultById(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Update
exports.updateResult = async (req, res) => {
  const { error } = resultSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const result = await updateResult(req.params.id, req.body);
    res.status(200).json({ message: 'Result updated', result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete
exports.deleteResult = async (req, res) => {
  try {
    await deleteResult(req.params.id);
    res.status(200).json({ message: 'Result deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
