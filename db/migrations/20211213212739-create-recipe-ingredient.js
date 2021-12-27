'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RecipeIngredients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      recipeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{model: 'Recipes'}
      },
      ingredientId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{model: 'Ingredients'}
      },
      quantity: {
        allowNull: false,
        type: Sequelize.NUMERIC(6, 2)
      },
      measurementId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{model: 'Measurements'}
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('RecipeIngredients');
  }
};
