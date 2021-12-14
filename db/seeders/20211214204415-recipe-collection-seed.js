'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('RecipeCollections', [
      {
        recipeId: 1,
        collectionId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        recipeId: 1,
        collectionId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        recipeId: 2,
        collectionId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        recipeId: 2,
        collectionId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        recipeId: 3,
        collectionId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        recipeId: 3,
        collectionId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        recipeId: 4,
        collectionId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        recipeId: 4,
        collectionId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('RecipeCollections', null, {})
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
