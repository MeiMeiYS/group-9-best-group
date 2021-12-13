'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecipeTag = sequelize.define('RecipeTag', {
    tagId: DataTypes.INTEGER,
    recipeId: DataTypes.INTEGER
  }, {});
  RecipeTag.associate = function(models) {
    // associations can be defined here
  };
  return RecipeTag;
};