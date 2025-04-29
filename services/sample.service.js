// services/sample.service.js
// const { Sample } = require('../models');
// const { User } = require('../models');

// // Create a new sample
// async function createSample(SampleType, collected_by) {
//   try {
//     const user = await User.findByPk(collected_by);
//     if (!user) throw new Error("User not found");

//     return await Sample.create({ SampleType, collected_by });
//   } catch (err) {
//     throw new Error(err.message);
//   }
// }

// // Get all samples
// async function getAllSamples() {
//   try {
//     return await Sample.findAll({
//       include: [User],
//     });
//   } catch (err) {
//     throw new Error("Error fetching samples: " + err.message);
//   }
// }

// // Get a sample by ID
// async function getSampleById(id) {
//   try {
//     const sample = await Sample.findByPk(id, {
//       include: [User],
//     });
//     if (!sample) throw new Error("Sample not found");
//     return sample;
//   } catch (err) {
//     throw new Error(err.message);
//   }
// }

// // Update a sample
// async function updateSample(id, type, collected_by) {
//   try {
//     const sample = await Sample.findByPk(id);
//     if (!sample) throw new Error("Sample not found");

//     const user = await User.findByPk(collected_by);
//     if (!user) throw new Error("User not found");

//     sample.type = type ?? sample.type;
//     sample.collected_by = collected_by ?? sample.collected_by;

//     await sample.save();
//     return sample;
//   } catch (err) {
//     throw new Error(err.message);
//   }
// }

// // Delete a sample
// async function deleteSample(id) {
//   try {
//     const sample = await Sample.findByPk(id);
//     if (!sample) throw new Error("Sample not found");

//     await sample.destroy();
//     return { message: "Sample deleted successfully" };
//   } catch (err) {
//     throw new Error(err.message);
//   }
// }

// module.exports = { createSample, getAllSamples, getSampleById, updateSample, deleteSample };

const { Sample, User, OrderTest } = require('../models');

// Create a new sample
async function createSample(order_test_id, sample_type, collected_by) {
  try {
    const user = await User.findByPk(collected_by);
    if (!user) throw new Error("Collected by user not found");

    const orderTest = await OrderTest.findByPk(order_test_id);
    if (!orderTest) throw new Error("OrderTest not found");

    return await Sample.create({
      order_test_id,
      sample_type,
      collected_by
    });
  } catch (err) {
    throw new Error(err.message);
  }
}

// Get all samples
async function getAllSamples() {
  try {
    return await Sample.findAll({
      include: [User, OrderTest]
    });
  } catch (err) {
    throw new Error("Error fetching samples: " + err.message);
  }
}

// Get a sample by ID
async function getSampleById(id) {
  try {
    const sample = await Sample.findByPk(id, {
      include: [User, OrderTest]
    });
    if (!sample) throw new Error("Sample not found");
    return sample;
  } catch (err) {
    throw new Error(err.message);
  }
}

// Update a sample
async function updateSample(id, order_test_id, sample_type, collected_by) {
  try {
    const sample = await Sample.findByPk(id);
    if (!sample) throw new Error("Sample not found");

    const user = await User.findByPk(collected_by);
    if (!user) throw new Error("User not found");

    const orderTest = await OrderTest.findByPk(order_test_id);
    if (!orderTest) throw new Error("OrderTest not found");

    sample.order_test_id = order_test_id ?? sample.order_test_id;
    sample.sample_type = sample_type ?? sample.sample_type;
    sample.collected_by = collected_by ?? sample.collected_by;

    await sample.save();
    return sample;
  } catch (err) {
    throw new Error(err.message);
  }
}

// Delete a sample
async function deleteSample(id) {
  try {
    const sample = await Sample.findByPk(id);
    if (!sample) throw new Error("Sample not found");

    await sample.destroy();
    return { message: "Sample deleted successfully" };
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = {
  createSample,
  getAllSamples,
  getSampleById,
  updateSample,
  deleteSample
};
