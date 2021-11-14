'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('links', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      facebook: {
        type: Sequelize.TEXT
      },
      instagram: {
        type: Sequelize.TEXT
      },
      twitter: {
        type: Sequelize.TEXT
      },
      youtube: {
        type: Sequelize.TEXT
      },
      whatsapp: {
        type: Sequelize.TEXT
      },
      brandId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'brands',
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
    await queryInterface.dropTable('links');
  }
};