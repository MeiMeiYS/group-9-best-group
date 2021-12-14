'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
      return queryInterface.bulkInsert('Tags', [
        {name: 'sweet', tagCategoryId: 1, createdAt: new Date(), updatedAt: new Date()},
        {name: 'creamy', tagCategoryId: 2, createdAt: new Date(), updatedAt: new Date()},
        {name: 'crunchy', tagCategoryId: 2, createdAt: new Date(), updatedAt: new Date()},
        {name: 'difficult', tagCategoryId: 1, createdAt: new Date(), updatedAt: new Date()}
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
      return queryInterface.bulkDelete('Tags', null, {});
  }
};
