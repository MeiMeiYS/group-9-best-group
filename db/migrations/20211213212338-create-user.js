'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {

    const randomUserImage = () => {
      return (Math.floor(Math.random()*9) + 19).toString()
    }

    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userName: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(50)
      },
      hashedPassword: {
        allowNull: false,
        type: Sequelize.STRING.BINARY
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      imageId: {
        type: Sequelize.INTEGER,
        references: { model: 'Images' },
        defaultValue: randomUserImage(),
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
    return queryInterface.dropTable('Users');
  }
};
