'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(50)
    },
    hashedPassword: {
      allowNull: false,
      type: DataTypes.STRING.BINARY
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    imageId: {
      type: DataTypes.INTEGER,
      references: { model: 'Images'}
    }
  }, {});
  User.associate = function(models) {
    User.belongsTo(models.Image, {foreignKey: 'imageId'});
    User.hasMany(models.Collection, {foreignKey: 'userId'});
    User.hasMany(models.Recipe, {foreignKey: 'userId'});
    // roles
  };
  return User;
};
