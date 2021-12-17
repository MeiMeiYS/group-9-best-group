'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Measurements', [
      { type: '', createdAt: new Date(), updatedAt: new Date() },
      { type: 'cups', createdAt: new Date(), updatedAt: new Date() },
      { type: 'fluid ounces', createdAt: new Date(), updatedAt: new Date() },
      { type: 'gallons', createdAt: new Date(), updatedAt: new Date() },
      { type: 'grams', createdAt: new Date(), updatedAt: new Date() },
      { type: 'liters', createdAt: new Date(), updatedAt: new Date() },
      { type: 'milliliters', createdAt: new Date(), updatedAt: new Date() },
      { type: 'ounces', createdAt: new Date(), updatedAt: new Date() },
      { type: 'pinch', createdAt: new Date(), updatedAt: new Date() },
      { type: 'pints', createdAt: new Date(), updatedAt: new Date() },
      { type: 'pounds', createdAt: new Date(), updatedAt: new Date() },
      { type: 'quarts', createdAt: new Date(), updatedAt: new Date() },
      { type: 'tablespoons', createdAt: new Date(), updatedAt: new Date() },
      { type: 'teaspoons', createdAt: new Date(), updatedAt: new Date() },
      { type: 'cans', createdAt: new Date(), updatedAt: new Date() },
      { type: 'slices', createdAt: new Date(), updatedAt: new Date() },
      { type: 'splash', createdAt: new Date(), updatedAt: new Date() },
      ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Measurements', null, {});
  }
};
