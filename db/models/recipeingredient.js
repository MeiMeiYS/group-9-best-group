'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecipeIngredient = sequelize.define('RecipeIngredient', {
    recipeId: DataTypes.INTEGER,
    ingredientId: DataTypes.INTEGER,
    quantity: DataTypes.NUMERIC,
    measurementId: DataTypes.INTEGER
  }, {});
  RecipeIngredient.associate = function(models) {
    // associations can be defined here
  };
  return RecipeIngredient;
};