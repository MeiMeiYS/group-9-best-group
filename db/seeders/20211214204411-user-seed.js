'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    const randomUserImage = () => {
      return (Math.floor(Math.random()*9) + 19).toString()
    }
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
        hashedPassword: '$2a$10$6mSjDaJMN0nMmm/Iikwdoub4r/nJRyT2HIcl2RJw8rtavuKRsKfpS',
        email: 'superchef@gmail.com',
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
      },
      {
        userName: 'demouser',
        hashedPassword: '$2a$10$0ILB5FzeXNK6AM5nJ3ZpaO6kz7R7errJnpWYPYw0URmMy8QP6KfTW',
        email: 'demouser@gmail.com',
        imageId: randomUserImage(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userName: 'demouser2',
        hashedPassword: '$2a$10$0ILB5FzeXNK6AM5nJ3ZpaO6kz7R7errJnpWYPYw0URmMy8QP6KfTW',
        email: 'demouser2@gmail.com',
        imageId: randomUserImage(),
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
