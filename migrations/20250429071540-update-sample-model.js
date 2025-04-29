'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Add new column `order_test_id`
    await queryInterface.addColumn('Samples', 'order_test_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'OrderTests',
        key: 'id'
      },
      onDelete: 'CASCADE'
    });

    // 2. Add new column `sample_type`
    await queryInterface.addColumn('Samples', 'sample_type', {
      type: Sequelize.STRING,
      allowNull: false
    });

    // 3. (Optional) If needed: Update `collected_by` reference (only if relationship changed)

    // 4. (Optional) If you want: Remove old columns (but be careful!)
  },

  down: async (queryInterface, Sequelize) => {
    // rollback (undo changes)
    await queryInterface.removeColumn('Samples', 'order_test_id');
    await queryInterface.removeColumn('Samples', 'sample_type');
  }
};
