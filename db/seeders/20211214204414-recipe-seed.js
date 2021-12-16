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

      return queryInterface.bulkInsert('Recipes', [
        {
          name: 'homemade plain pancake',
          description: 'This delicious homemade pancake batter makes about 10 pancakes.',
          userId: 1,
          steps: 'Mix flour, milk, egg, butter, sugar, baking powder, and salt together. \nHeat a lightly oiled griddle over low heat. \nScoop 1/4 cup batter onto the griddle and cook until top and edges are dry, 3 to 4 minutes. \nFlip and cook until lightly browned on the other side, 2 to 3 minutes. \nRepeat with remaining batter.',
          imageId: 30,
          createdAt: new Date(), updatedAt: new Date()
        },
        {
          name: 'brownie cupcakes',
          description: 'Grandma Page\'s brownie cupcakes!',
          userId: 1,
          steps: 'Preheat oven to 325 degrees F (165 degrees C). Line 18 cupcake cups with paper liners. \nMelt butter and chocolate chips together in a saucepan over low heat, stirring until smooth; let cool. \nBeat eggs and sugar together in a mixing bowl until thoroughly combined. Mix flour and vanilla extract into egg mixture. Fold in chocolate mixture until batter is smooth. Pour batter into prepared cupcake cups, filling them about 1/2 full. \nBake in the preheated oven until a toothpick inserted into the center of a cupcake comes out clean or with moist crumbs, about 30 minutes.',
          // imageId: 31,
          createdAt: new Date(), updatedAt: new Date()
        },
        {
          name: 'belGioioso tiramisu dessert',
          description: 'A layer of espresso-dipped ladyfingers is topped with a creamy layer of mascarpone flavored with espresso, brandy, with beaten egg whites. Dusted with cocoa powder, this is a classic elegant dessert.',
          userId: 2,
          steps: 'Combine 3 egg yolks, 1 Tbsp. espresso, sugar and cognac into large bowl. Beat 2-3 minutes. Add BelGioioso Mascarpone and beat 3 to 5 minutes until smooth. \nIn another bowl, combine 3 egg whites and a pinch of sugar. Beat until stiff peaks form. Gently fold into Mascarpone mixture. (*If using egg substitute, skip step 2 and beat until fluffy.) \nQuickly dip each ladyfinger into remaining espresso and layer on bottom of small serving dish. Spread Mascarpone mixture and sprinkle with cocoa. Refrigerate at least 1 hour before serving.',
          imageId: 32,
          createdAt: new Date(), updatedAt: new Date()
        },
        {
          name: 'Chocolate Creme Fraiche Ice Cream',
          description: 'A rich dark chocolate ice cream.',
          userId: 2,
          steps: 'Blend the chocolate and milk together in a blender on high until smooth; add the creme fraiche, sugar, maple syrup, and vanilla extract. Blend again until the sugar has dissolved. \nPour the mixture into an ice cream maker and freeze according to manufacturer\'s directions until it reaches "soft-serve" consistency. Transfer ice cream to a lidded plastic container; cover surface with plastic wrap and seal. For best results, ice cream should ripen in the freezer at least 2 hours or overnight.',
          // imageId: 33,
          createdAt: new Date(), updatedAt: new Date()
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

      return queryInterface.bulkDelete('Recipes', null, {});
  }
};
