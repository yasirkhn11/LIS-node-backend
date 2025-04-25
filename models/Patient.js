// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

// const Patient = sequelize.define('Patient', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     name: { type: DataTypes.STRING, allowNull: false },
//     age: { type: DataTypes.INTEGER, allowNull: false },
//     gender: { type: DataTypes.ENUM('male', 'female', 'other'), allowNull: false },
//     contact: { type: DataTypes.STRING, allowNull: false },
// }, {
//     timestamps: true
// });

// module.exports = Patient;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Patient = sequelize.define('Patient', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, references: { model: 'Users', key: 'id' }, allowNull: false },
    dob: { type: DataTypes.DATEONLY, allowNull: false },
    gender: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
}, {
    timestamps: true
});

// Associations
Patient.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

module.exports = Patient;

