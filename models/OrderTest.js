

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Order = require('./Order');
const Test = require('./Test');

const OrderTest = sequelize.define('OrderTest', {
    order_id: {
        type: DataTypes.INTEGER,
        references: { model: 'Orders', key: 'id' },
        allowNull: false
    },
    test_id: {
        type: DataTypes.INTEGER,
        references: { model: 'Tests', key: 'id' },
        allowNull: false
    },
    // Additional fields can be added if needed
}, {
    timestamps: true,
    
});

// Associations (Optional, since it's a join table, it's usually not necessary to set associations here)
Order.belongsToMany(Test, { through: OrderTest, foreignKey: 'order_id' });
Test.belongsToMany(Order, { through: OrderTest, foreignKey: 'test_id' });

module.exports = OrderTest;
