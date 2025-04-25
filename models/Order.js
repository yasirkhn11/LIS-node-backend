// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');
// const Patient = require('./Patient');
// const User = require('./User');

// const Order = sequelize.define('Order', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     status: { type: DataTypes.ENUM('pending', 'completed', 'cancelled'), defaultValue: 'pending' },
// }, {
//     timestamps: true
// });

// // Associations
// Order.belongsTo(Patient, { foreignKey: 'patientId', onDelete: 'CASCADE' });
// Order.belongsTo(User, { foreignKey: 'createdBy', onDelete: 'CASCADE' });

// module.exports = Order;


const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Patient = require('./Patient');

const Order = sequelize.define('Order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    patient_id: { type: DataTypes.INTEGER, references: { model: 'Patients', key: 'id' }, allowNull: false },
    status: { type: DataTypes.ENUM('pending', 'in_progress', 'completed'), defaultValue: 'pending' },
    ordered_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    timestamps: true
});

// Associations
Order.belongsTo(Patient, { foreignKey: 'patient_id', onDelete: 'CASCADE' });

module.exports = Order;
