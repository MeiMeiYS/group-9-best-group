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
    return queryInterface.bulkInsert('Users', [
      {
        userName: 'superchef',
        hashedPassword: '$2a$12$3yey1Jyop6KLDCxYHQq53e2x0U572BWykyJ2uC.pSpmOLDaMmRYQe',
        email: 'superchef98789@gmail.com',
        imageId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userName: 'HomeCook123',
        hashedPassword: '$2a$12$XKMrQwyISJY53XE95WKwue/i68.umzxYM5GAdMkhpuq5K18dqELtG',
        email: 'homecook123321123@gmail.com',
        imageId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
