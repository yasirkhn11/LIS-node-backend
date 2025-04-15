const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Order = require('./Order');
const Test = require('./Test');

const Sample = sequelize.define('Sample', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: { type: DataTypes.ENUM('collected', 'processing', 'completed'), defaultValue: 'collected' },
}, {
    timestamps: true
});

// Associations
Sample.belongsTo(Order, { foreignKey: 'orderId', onDelete: 'CASCADE' });
Sample.belongsTo(Test, { foreignKey: 'testId', onDelete: 'CASCADE' });

module.exports = Sample;
