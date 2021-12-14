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
      return queryInterface.bulkInsert('RecipeIngredients', [
        //below is for recipe 1
        {
          recipeId: 1,
          ingredientId: 1,
          quantity: 1.5,
          measurementId: 1,//cup
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          recipeId: 1,
          ingredientId: 2,
          quantity: 1.25,
          measurementId: 1,//cup
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          recipeId: 1,
          ingredientId: 3,
          quantity: 1,
          measurementId: 14,//empty string
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          recipeId: 1,
          ingredientId: 4,
          quantity: 3,
          measurementId: 12,//tablespoons
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          recipeId: 1,
          ingredientId: 5,
          quantity: 1,
          measurementId: 12,//tablespoons
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          recipeId: 1,
          ingredientId: 6,
          quantity: 2,
          measurementId: 13,//teaspoons
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          recipeId: 1,
          ingredientId: 7,
          quantity: 1,
          measurementId: 13,//teaspoons
          createdAt: new Date(),
          updatedAt: new Date()
        },
        //below is for recipe 2
        {
          recipeId: 2,
          ingredientId: 4,
          quantity: 1,
          measurementId: 1,//cup
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          recipeId: 2,
          ingredientId: 8,
          quantity: 1,
          measurementId: 1,//cup
          createdAt: new Date(),
          updatedAt: new Date()
        },{
          recipeId: 2,
          ingredientId: 3,
          quantity: 4,
          measurementId: 14,//empty string
          createdAt: new Date(),
          updatedAt: new Date()
        },{
          recipeId: 2,
          ingredientId: 5,
          quantity: 1.5,
          measurementId: 1,//cup
          createdAt: new Date(),
          updatedAt: new Date()
        },{
          recipeId: 2,
          ingredientId: 1,
          quantity: 1,
          measurementId: 1,//cup
          createdAt: new Date(),
          updatedAt: new Date()
        },{
          recipeId: 2,
          ingredientId: 9,
          quantity: 1,
          measurementId: 13,//teaspoons
          createdAt: new Date(),
          updatedAt: new Date()
        },
        //below is for recipe 3
        {
          recipeId: 3,
          ingredientId: 3,
          quantity: 3,
          measurementId: 14,//empty string
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          recipeId: 3,
          ingredientId: 10,
          quantity: 1,
          measurementId: 1,//cup
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          recipeId: 3,
          ingredientId: 5,
          quantity: 0.5,
          measurementId: 1,//cup
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          recipeId: 3,
          ingredientId: 11,
          quantity: 2,
          measurementId: 12,//tablespoons
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          recipeId: 3,
          ingredientId: 12,
          quantity: 8,
          measurementId: 7,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          recipeId: 3,
          ingredientId: 13,
          quantity: 2,
          measurementId: 12,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          recipeId: 3,
          ingredientId: 14,
          quantity: 10,
          measurementId: 14,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        //below is for recipe 4
        {
          recipeId: 4,
          ingredientId: 15,
          quantity: 1,
          measurementId: 7,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          recipeId: 4,
          ingredientId: 2,
          quantity: 1,
          measurementId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          recipeId: 4,
          ingredientId: 16,
          quantity: 2,
          measurementId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          recipeId: 4,
          ingredientId: 5,
          quantity: 0.5,
          measurementId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          recipeId: 4,
          ingredientId: 17,
          quantity: 0.25,
          measurementId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          recipeId: 4,
          ingredientId: 9,
          quantity: 1,
          measurementId: 13,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
      return queryInterface.bulkDelete('RecipeIngredients', null, {});
  }
};
