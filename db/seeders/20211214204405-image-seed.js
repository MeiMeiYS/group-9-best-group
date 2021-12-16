'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [


      //recipe
      {url: 'https://i.ibb.co/sHsTQDd/default-09.jpg',
        createdAt: new Date(),
        updatedAt: new Date() },
      {url: 'https://i.ibb.co/8KZGp6K/default-08.jpg',
        createdAt: new Date(),
        updatedAt: new Date() },
      {url: 'https://i.ibb.co/mRGkgKC/default-07.jpg',
        createdAt: new Date(),
        updatedAt: new Date() },
      {url: 'https://i.ibb.co/Pxt8Wjt/default-06.jpg',
        createdAt: new Date(),
        updatedAt: new Date() },
      {url: 'https://i.ibb.co/82VrZcY/default-05.jpg',
        createdAt: new Date(),
        updatedAt: new Date() },
      {url: 'https://i.ibb.co/LtX0Mxg/default-04.jpg',
        createdAt: new Date(),
        updatedAt: new Date() },
      {url: 'https://i.ibb.co/vYMkL5s/default-03.jpg',
        createdAt: new Date(),
        updatedAt: new Date() },
      {url: 'https://i.ibb.co/vHSjTvd/default-01.jpg',
        createdAt: new Date(),
        updatedAt: new Date() },
    { url: 'https://i.ibb.co/S3LwnLZ/default-02.jpg' ,
      createdAt: new Date(),
      updatedAt: new Date() },

      //review
      {url: 'https://i.ibb.co/0fZR7KH/default-09.jpg',
        createdAt: new Date(),
        updatedAt: new Date() },
      {url: 'https://i.ibb.co/YTMdqZn/default-08.jpg',
        createdAt: new Date(),
        updatedAt: new Date() },
      {url: 'https://i.ibb.co/G3k3M8Z/default-07.jpg',
        createdAt: new Date(),
        updatedAt: new Date() },
      {url: 'https://i.ibb.co/zbJKs2y/default-06.jpg',
        createdAt: new Date(),
        updatedAt: new Date() },
      {url: 'https://i.ibb.co/JKqB6Fm/default-05.jpg',
        createdAt: new Date(),
        updatedAt: new Date() },
      {url: 'https://i.ibb.co/2S6ZhFs/default-04.jpg',
        createdAt: new Date(),
        updatedAt: new Date() },
      {url: 'https://i.ibb.co/zV5dMB9/default-03.jpg',
        createdAt: new Date(),
        updatedAt: new Date() },
      {url: 'https://i.ibb.co/SQ1DmvB/default-02.jpg',
        createdAt: new Date(),
        updatedAt: new Date() },
      { url: 'https://i.ibb.co/mJX8j0W/default-01.jpg' ,
        createdAt: new Date(),
        updatedAt: new Date() },

      //users
      {url: 'https://i.ibb.co/K0gMGCP/default-09.jpg',
        createdAt: new Date(),
        updatedAt: new Date() },
      {url: 'https://i.ibb.co/hs889VJ/default-08.jpg',
        createdAt: new Date(),
        updatedAt: new Date() },
      {url: 'https://i.ibb.co/xhCQPdW/default-07.jpg',
        createdAt: new Date(),
        updatedAt: new Date() },
      {url: 'https://i.ibb.co/x1QRnVw/default-06.jpg',
        createdAt: new Date(),
        updatedAt: new Date() },
      {url: 'https://i.ibb.co/F5Vz20r/default-05.jpg',
        createdAt: new Date(),
        updatedAt: new Date() },
      {url: 'https://i.ibb.co/jJ7dKN8/default-04.jpg',
        createdAt: new Date(),
        updatedAt: new Date() },
      {url: 'https://i.ibb.co/WBQHs9z/default-03.jpg',
        createdAt: new Date(),
        updatedAt: new Date() },
      {url: 'https://i.ibb.co/pdmX5HY/default-02.jpg',
        createdAt: new Date(),
        updatedAt: new Date() },
      {url: 'https://i.ibb.co/SByphfy/default-01.jpg' ,
        createdAt: new Date(),
        updatedAt: new Date() },

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
