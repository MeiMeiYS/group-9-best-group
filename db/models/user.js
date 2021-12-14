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
    // associations can be defined here
    const columnMapping = { through: "UserRole", otherKey: "roleId", foreignKey: "userId" }

    User.belongsToMany(models.Role, columnMapping);
    User.belongsTo(models.Image, {foreignKey: 'imageId'});
    User.hasMany(models.Collection, {foreignKey: 'userId'});
    User.hasMany(models.Recipe, {foreignKey: 'userId'});
    User.hasMany(models.Review, {foreignKey: 'userId'});
    // roles

    const recipeMapping = {
      through: 'RecipeStatus',
      otherKey: 'recipeId',
      foreignKey: 'userId'
    }

    User.belongsToMany(models.Recipe, recipeMapping)


    const statusMapping = {
      through: 'RecipeStatus',
      otherKey: 'statusId',
      foreignKey: 'userId'
    }

    User.belongsToMany(models.StatusType, statusMapping)

  };
  return User;
};
