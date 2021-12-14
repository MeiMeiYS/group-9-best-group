'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Collections', [
      {
        name: 'Favorite Desserts',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Top Chef Audition Practice',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    },
      {
        name: 'Thing My Dentist Said No To',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Healthy Lunches But Unhealthy & Not Lunch',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    ])
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Collections', null, {})
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
