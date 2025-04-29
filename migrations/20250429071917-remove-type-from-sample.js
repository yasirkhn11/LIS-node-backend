'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Samples', 'type');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Samples', 'type', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};
