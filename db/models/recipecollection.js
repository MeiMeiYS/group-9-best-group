'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecipeCollection = sequelize.define('RecipeCollection', {
    recipeId: DataTypes.INTEGER,
    collectionId: DataTypes.INTEGER
  }, {});
  RecipeCollection.associate = function(models) {
    // associations can be defined here
  };
  return RecipeCollection;
};