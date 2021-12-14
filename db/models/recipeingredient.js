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
    RecipeIngredient.belongsTo(models.Recipe, {foreignKey: 'recipeId'})
    RecipeIngredient.belongsTo(models.Ingredient, {foreignKey: 'ingredientId'})
    RecipeIngredient.belongsTo(models.Measurement, {foreignKey: 'measurementId'})
  };
  return RecipeIngredient;
};
