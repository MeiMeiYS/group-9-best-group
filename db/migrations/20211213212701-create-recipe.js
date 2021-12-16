'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {

    const randomRecipeImage = () => {
      return (Math.floor(Math.random()*9) + 1).toString()
    }

    return queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Users'}
      },
      steps: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      imageId: {
        type: Sequelize.INTEGER,
        references: { model: 'Images' },
        defaultValue: randomRecipeImage()
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
    return queryInterface.dropTable('Recipes');
  }
};
