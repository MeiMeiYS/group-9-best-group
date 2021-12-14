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

      return queryInterface.bulkInsert('Ingredients', [
        {name: 'all-purpose flour', createdAt: new Date(), updatedAt: new Date() },
        {name: 'milk', createdAt: new Date(), updatedAt: new Date() },
        {name: 'egg', createdAt: new Date(), updatedAt: new Date() },
        {name: 'butter', createdAt: new Date(), updatedAt: new Date() },
        {name: 'white sugar', createdAt: new Date(), updatedAt: new Date() },
        {name: 'baking powder', createdAt: new Date(), updatedAt: new Date() },
        {name: 'salt', createdAt: new Date(), updatedAt: new Date() },
        {name: 'chocolate chips', createdAt: new Date(), updatedAt: new Date() },
        {name: 'vanilla extract', createdAt: new Date(), updatedAt: new Date() },
        {name: 'espresso', createdAt: new Date(), updatedAt: new Date() },
        {name: 'brandy', createdAt: new Date(), updatedAt: new Date() },
        {name: 'belGioioso mascarpone cheese', createdAt: new Date(), updatedAt: new Date() },
        {name: 'unsweetened cocoa powder', createdAt: new Date(), updatedAt: new Date() },
        {name: 'ladyfingers', createdAt: new Date(), updatedAt: new Date() },
        {name: 'squares bittersweet chocolate', createdAt: new Date(), updatedAt: new Date() },
        {name: 'creme fraiche', createdAt: new Date(), updatedAt: new Date() },
        {name: 'maple syrup', createdAt: new Date(), updatedAt: new Date() }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */

      return queryInterface.bulkDelete('Ingredients', null, {});
  }
};
