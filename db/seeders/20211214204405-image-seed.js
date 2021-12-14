'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [
      { url: 'https://media.istockphoto.com/photos/smiling-male-cook-on-gray-background-picture-id1300835557', createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://media.istockphoto.com/photos/happy-family-in-the-kitchen-picture-id1148183758', createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://media.istockphoto.com/photos/pancakes-picture-id157558423', createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://media.istockphoto.com/photos/homemade-chocolate-brownies-on-a-white-plate-on-a-white-wooden-side-picture-id1167515863', createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://media.istockphoto.com/photos/tiramisu-picture-id585178794', createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://media.istockphoto.com/photos/belgian-chocolate-ice-creams-picture-id936155834', createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://media.istockphoto.com/photos/breakfast-pancake-isolated-on-white-background-picture-id667536204', createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://media.istockphoto.com/photos/young-caucasian-sad-woman-taking-burnt-bread-picture-id1176999971', createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://media.istockphoto.com/photos/strawberry-tiramisu-with-mascarpone-picture-id184245901', createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://media.istockphoto.com/photos/spilled-ice-cream-picture-id93234444', createdAt: new Date(), updatedAt: new Date() }
    ])
  },

  down: (queryInterface, Sequelize) => {


      return queryInterface.bulkDelete('Images', null, {});
  }
};
