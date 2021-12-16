'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    const randomReviewImage = () => {
      return (Math.floor(Math.random()*9) + 10).toString()
    }


    return queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'Users'}
      },
      recipeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'Recipes'}
      },
      review: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imageId: {
        type: Sequelize.INTEGER,
        references: { model: 'Images' },
        defaultValue: randomReviewImage()
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Reviews');
  }
};
