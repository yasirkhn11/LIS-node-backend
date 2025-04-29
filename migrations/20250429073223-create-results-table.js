'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Results', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      sample_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Samples',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      result_data: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      uploaded_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      uploaded_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Results');
  }
};
