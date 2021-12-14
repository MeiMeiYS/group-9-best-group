'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecipeIngredient = sequelize.define('RecipeIngredient', {
    recipeId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references:{model: 'Recipes'}
    },
    ingredientId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references:{model: 'Ingredients'}
    },
    quantity: {
      allowNull: false,
      type: DataTypes.NUMERIC(4, 2)
    },
    measurementId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references:{model: 'Measurements'}
    }
  }, {});
  RecipeIngredient.associate = function(models) {
    // associations can be defined here
    RecipeIngredient.belongsTo(models.Recipe, {foreignKey: 'recipeId'})
    RecipeIngredient.belongsTo(models.Ingredient, {foreignKey: 'ingredientId'})
    RecipeIngredient.belongsTo(models.Measurement, {foreignKey: 'measurementId'})
  };
  return RecipeIngredient;
};
