'use strict';
module.exports = (sequelize, DataTypes) => {

  const randomUserImage = () => {
    return (Math.floor(Math.random()*9) + 19).toString()
  }

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
      references: { model: 'Images' },
      defaultValue: randomUserImage()
    }
  }, {});
  User.associate = function(models) {
    const userRolesMapping = { through: "UserRole", otherKey: "roleId", foreignKey: "userId" }

    User.belongsToMany(models.Role, userRolesMapping);
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
