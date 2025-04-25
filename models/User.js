// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

// const User = sequelize.define('User', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     name: { type: DataTypes.STRING, allowNull: false },
//     email: { type: DataTypes.STRING, allowNull: false, unique: true },
//     password: { type: DataTypes.STRING, allowNull: false },
//     role: { type: DataTypes.ENUM('admin', 'lab_technician', 'doctor'), allowNull: false },
// }, {
//     timestamps: true
// });

// module.exports = User;
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('admin', 'lab_technician', 'patient'), allowNull: false },
}, {
    timestamps: true
});

module.exports = User;
