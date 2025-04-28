'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Drop the old primary key (if exists)
    await queryInterface.removeColumn('OrderTests', 'id');
    
    // 2. Remove the `sample_id` column
    await queryInterface.removeColumn('OrderTests', 'sample_id');

    // 3. (Optional) You may want to drop existing foreign key constraints manually here if necessary.

    // 4. Set composite primary key (order_id + test_id)
    await queryInterface.changeColumn('OrderTests', 'order_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Orders',
        key: 'id'
      },
      onDelete: 'CASCADE'
    });

    await queryInterface.changeColumn('OrderTests', 'test_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Tests',
        key: 'id'
      },
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    // 1. Re-add the `id` column
    await queryInterface.addColumn('OrderTests', 'id', {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    });

    // 2. Re-add the `sample_id` column
    await queryInterface.addColumn('OrderTests', 'sample_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Samples',
        key: 'id'
      },
      allowNull: true
    });

    // 3. Remove composite primary key from `order_id` and `test_id`
    await queryInterface.changeColumn('OrderTests', 'order_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Orders',
        key: 'id'
      }
    });

    await queryInterface.changeColumn('OrderTests', 'test_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Tests',
        key: 'id'
      }
    });
  }
};
