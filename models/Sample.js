// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');
// const Order = require('./Order');
// const Test = require('./Test');

// const Sample = sequelize.define('Sample', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     status: { type: DataTypes.ENUM('collected', 'processing', 'completed'), defaultValue: 'collected' },
// }, {
//     timestamps: true
// });

// // Associations
// Sample.belongsTo(Order, { foreignKey: 'orderId', onDelete: 'CASCADE' });
// Sample.belongsTo(Test, { foreignKey: 'testId', onDelete: 'CASCADE' });

// module.exports = Sample;

// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');
// const User = require('./User');

// const Sample = sequelize.define('Sample', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     type: { type: DataTypes.STRING, allowNull: false },
//     collected_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
//     collected_by: { type: DataTypes.INTEGER, references: { model: 'Users', key: 'id' }, allowNull: false },
// }, {
//     timestamps: true
// });

// // Associations
// Sample.belongsTo(User, { foreignKey: 'collected_by', onDelete: 'CASCADE' });

// module.exports = Sample;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const OrderTest = require('./OrderTest');

const Sample = sequelize.define('Sample', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    order_test_id: {
        type: DataTypes.INTEGER,
        references: { model: 'OrderTests', key: 'id' },
        allowNull: false
    },
    collected_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    collected_by: {
        type: DataTypes.INTEGER,
        references: { model: 'Users', key: 'id' }, // lab_technician
        allowNull: false
    },
    sample_type: { type: DataTypes.STRING, allowNull: false }, // e.g., "blood", "urine"
}, {
    timestamps: true
});

module.exports = Sample;

