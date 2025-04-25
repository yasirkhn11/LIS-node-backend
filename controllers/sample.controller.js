// controllers/sample.controller.js
const Sample = require('../models/Sample');
const User = require('../models/User');

// Create a new Sample
exports.createSample = async (req, res) => {
  try {
    const { type, collected_by } = req.body;

    // Validate if the user exists
    const user = await User.findByPk(collected_by);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const newSample = await Sample.create({ type, collected_by });
    res.status(201).json(newSample);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all Samples
exports.getAllSamples = async (req, res) => {
  try {
    const samples = await Sample.findAll({
      include: [User], // Include the related User data (collected_by)
    });
    res.status(200).json(samples);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get Sample by ID
exports.getSampleById = async (req, res) => {
  try {
    const { id } = req.params;
    const sample = await Sample.findByPk(id, {
      include: [User], // Include the related User data (collected_by)
    });

    if (!sample) return res.status(404).json({ message: 'Sample not found' });
    res.status(200).json(sample);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a Sample
exports.updateSample = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, collected_by } = req.body;

    const sample = await Sample.findByPk(id);
    if (!sample) return res.status(404).json({ message: 'Sample not found' });

    // Validate if the user exists
    const user = await User.findByPk(collected_by);
    if (!user) return res.status(404).json({ message: 'User not found' });

    sample.type = type;
    sample.collected_by = collected_by;

    await sample.save();
    res.status(200).json({ message: 'Sample updated successfully', sample });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a Sample
exports.deleteSample = async (req, res) => {
  try {
    const { id } = req.params;
    const sample = await Sample.findByPk(id);
    if (!sample) return res.status(404).json({ message: 'Sample not found' });

    await sample.destroy();
    res.status(200).json({ message: 'Sample deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
