'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('RecipeTags', [
      { tagId: 1, recipeId: 1, createdAt: new Date(), updatedAt: new Date()},
      { tagId: 2, recipeId: 1, createdAt: new Date(), updatedAt: new Date()},
      { tagId: 1, recipeId: 2, createdAt: new Date(), updatedAt: new Date()},
      { tagId: 3, recipeId: 3, createdAt: new Date(), updatedAt: new Date()},
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */

      return queryInterface.bulkDelete('RecipeTags', null, {});
  }
};
