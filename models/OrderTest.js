const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Order = require('./Order');
const Test = require('./Test');
const Sample = require('./Sample');

const OrderTest = sequelize.define('OrderTest', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    order_id: { type: DataTypes.INTEGER, references: { model: 'Orders', key: 'id' }, allowNull: false },
    test_id: { type: DataTypes.INTEGER, references: { model: 'Tests', key: 'id' }, allowNull: false },
    sample_id: { type: DataTypes.INTEGER, references: { model: 'Samples', key: 'id' }, allowNull: false },
}, {
    timestamps: true
});

// Associations
OrderTest.belongsTo(Order, { foreignKey: 'order_id', onDelete: 'CASCADE' });
OrderTest.belongsTo(Test, { foreignKey: 'test_id', onDelete: 'CASCADE' });
OrderTest.belongsTo(Sample, { foreignKey: 'sample_id', onDelete: 'CASCADE' });

module.exports = OrderTest;