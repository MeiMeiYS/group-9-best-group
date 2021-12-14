'use strict';
module.exports = (sequelize, DataTypes) => {
  const StatusType = sequelize.define('StatusType', {
    type: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(50)
    }
  }, {});
  StatusType.associate = function(models) {
    // associations can be defined here

    const recipeMapping = {
      through: 'RecipeStatus',
      otherKey: 'recipeId',
      foreignKey: 'statusId'
    }

    StatusType.belongsToMany(models.Recipe, recipeMapping)



    const userMapping = {
      through: 'RecipeStatus',
      otherKey: 'userId',
      foreignKey: 'statusId'
    }

    StatusType.belongsToMany(models.User, userMapping)


  };
  return StatusType;
};
