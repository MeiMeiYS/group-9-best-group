'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecipeStatus = sequelize.define('RecipeStatus', {
    userId: DataTypes.INTEGER,
    recipeId: DataTypes.INTEGER,
    statusId: DataTypes.INTEGER
  }, {});
  RecipeStatus.associate = function(models) {
    // associations can be defined here
  };
  return RecipeStatus;
};