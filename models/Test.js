// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

// const Test = sequelize.define('Test', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     name: { type: DataTypes.STRING, allowNull: false },
//     category: { type: DataTypes.STRING, allowNull: false },
//     price: { type: DataTypes.FLOAT, allowNull: false },
// }, {
//     timestamps: true
// });

// module.exports = Test;
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Test = sequelize.define('Test', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
}, {
    timestamps: true
});

module.exports = Test;
