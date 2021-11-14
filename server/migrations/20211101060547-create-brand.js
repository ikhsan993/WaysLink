'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('brands', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      link: {
        type: Sequelize.STRING
      },
      visits: {
        type: Sequelize.STRING
      },
      thumbnail: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT
      },
      userId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'users',
          key : 'id',
        },
        onUpdate : 'CASCADE',
        onDelete : 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('brands');
  }
};