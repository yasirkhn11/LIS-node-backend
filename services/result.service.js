const Result = require('../models/Result');
const Sample = require('../models/Sample');
const User = require('../models/User');



async function createResult({ sample_id, result_data, uploaded_by }) {
  const sample = await Sample.findByPk(sample_id);
  if (!sample) throw new Error('Sample not found');

  const user = await User.findByPk(uploaded_by);
  if (!user) throw new Error('Uploader not found');

  return await Result.create({ sample_id, result_data, uploaded_by });
}

async function getAllResults() {
  return await Result.findAll({
    include: ['Sample', 'User']
  });
}

async function getResultById(id) {
  const result = await Result.findByPk(id, {
    include: ['Sample', 'User']
  });
  if (!result) throw new Error('Result not found');
  return result;
}

async function updateResult(id, { sample_id, result_data, uploaded_by }) {
  const result = await Result.findByPk(id);
  if (!result) throw new Error('Result not found');

  const sample = await Sample.findByPk(sample_id);
  if (!sample) throw new Error('Sample not found');

  const user = await User.findByPk(uploaded_by);
  if (!user) throw new Error('Uploader not found');

  result.sample_id = sample_id;
  result.result_data = result_data;
  result.uploaded_by = uploaded_by;

  await result.save();
  return result;
}

async function deleteResult(id) {
  const result = await Result.findByPk(id);
  if (!result) throw new Error('Result not found');
  await result.destroy();
}

module.exports = {
  createResult,
  getAllResults,
  getResultById,
  updateResult,
  deleteResult
};
