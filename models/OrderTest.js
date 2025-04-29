

// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');
// const Order = require('./Order');
// const Test = require('./Test');

// const OrderTest = sequelize.define('OrderTest', {
//     order_id: {
//         type: DataTypes.INTEGER,
//         references: { model: 'Orders', key: 'id' },
//         allowNull: false
//     },
//     test_id: {
//         type: DataTypes.INTEGER,
//         references: { model: 'Tests', key: 'id' },
//         allowNull: false
//     },
//     // Additional fields can be added if needed
// }, {
//     timestamps: true,
    
// });

// // Associations (Optional, since it's a join table, it's usually not necessary to set associations here)
// Order.belongsToMany(Test, { through: OrderTest, foreignKey: 'order_id' });
// Test.belongsToMany(Order, { through: OrderTest, foreignKey: 'test_id' });

// module.exports = OrderTest;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Order = require('./Order');
const Test = require('./Test');

const OrderTest = sequelize.define('OrderTest', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
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
    status: {
        type: DataTypes.ENUM('pending', 'collected', 'tested', 'completed'),
        defaultValue: 'pending'
    },
    assigned_technician: {
        type: DataTypes.INTEGER,
        references: { model: 'Users', key: 'id' },
        allowNull: true
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: true
});

// Associations
Order.belongsToMany(Test, { through: OrderTest, foreignKey: 'order_id' });
Test.belongsToMany(Order, { through: OrderTest, foreignKey: 'test_id' });

module.exports = OrderTest;

