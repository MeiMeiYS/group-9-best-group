'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('RecipeStatuses', [
        { userId: 1, recipeId: 1, statusId: 1, createdAt: new Date(), updatedAt: new Date() },
        { userId: 1, recipeId: 2, statusId: 2, createdAt: new Date(), updatedAt: new Date() },
        { userId: 2, recipeId: 3, statusId: 1, createdAt: new Date(), updatedAt: new Date() },
        { userId: 2, recipeId: 4, statusId: 2, createdAt: new Date(), updatedAt: new Date() }
      ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('RecipeStatuses', null, {});
  }
};
