'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Reviews', [
      {
        userId: 1,
        recipeId: 1,
        review: `Overall could have used more crushed up Doritos and way less of everything else.`,
        // imageId: 5,
        rating: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        recipeId: 2,
        review: `I was hoping this would help me grow my hair back \n but it just made my head really sticky. Do not recommend.`,
        // imageId: 6,
        rating: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        recipeId: 3,
        rating: 3,
        review: `Instead of the dry ingredients I used water, and instead of the wet ingredients I used nothing. Super budget friendly but could have tasted better.`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        recipeId: 4,
        review: `Smelled so good that wild hyenas started swarming my kitchen. I don't know where they came from. I live in Cleveland. We don't even have a zoo here, I don't think.`,
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        recipeId: 3,
        review: `It didn't make me a million dollars richer, and it didn't stop global warming. Wouldn't elect it president but not bad for a little snack.`,
        // imageId: 7,
        rating: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        recipeId: 4,
        review: `I wanted to love it, but I haven't been able to truly love anything ever since Lynette and Tom split up on Desperate Housewives`,
        // imageId: 8,
        rating: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        recipeId: 1,
        review: `I was cooking it, and then maybe a bug on the website (?) but my physical form dissolved as I got pulled into my screen and now I'm trapped in this website forever. HELP. HELP. HELP.`,
        rating: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        recipeId: 2,
        review: `DO NOT COOK THIS. It will ruin your social life because all you'll want to do after eating this is to spend every waking moment cooking and eating again and again.`,
        rating: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },

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
    return queryInterface.bulkDelete('Reviews', null, {})
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
