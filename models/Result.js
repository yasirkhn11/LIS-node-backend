// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');
// const Sample = require('./Sample'); // Linking to the Sample model

// const Result = sequelize.define('Result', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     sample_id: {
//         type: DataTypes.INTEGER,
//         references: { model: 'Samples', key: 'id' },
//         allowNull: false
//     },
//     result_value: {
//         type: DataTypes.STRING,
//         allowNull: true // The test result (e.g., "positive", "negative", numerical value, etc.)
//     },
//     status: {
//         type: DataTypes.ENUM('pending', 'completed', 'rejected'),
//         defaultValue: 'pending', // Default status for the result
//         allowNull: false
//     },
//     comments: {
//         type: DataTypes.TEXT,
//         allowNull: true // Additional comments from the lab technician about the result
//     },
//     created_at: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW,
//         allowNull: false // Timestamp for when the result was created
//     }
// }, {
//     timestamps: true,
    
// });

// // Associations
// Result.belongsTo(Sample, { foreignKey: 'sample_id', onDelete: 'CASCADE' });

// module.exports = Result;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const OrderTest = require('./OrderTest');

const Result = sequelize.define('Result', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  ordertest_id: { type: DataTypes.INTEGER, references: { model: 'OrderTests', key: 'id' }, allowNull: false },
  result_value: { type: DataTypes.STRING, allowNull: false },
  result_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  result_status: { type: DataTypes.ENUM('pending', 'completed', 'rejected'), defaultValue: 'pending' },
}, {
  timestamps: true
});

// Associations
Result.belongsTo(OrderTest, { foreignKey: 'ordertest_id', onDelete: 'CASCADE' });

module.exports = Result;

