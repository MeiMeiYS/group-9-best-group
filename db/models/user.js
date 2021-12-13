'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING
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
      type: Sequelize.INTEGER
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
