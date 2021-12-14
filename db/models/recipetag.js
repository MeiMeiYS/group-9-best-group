'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecipeTag = sequelize.define('RecipeTag', {
    tagId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {model: 'Tags'}
    },
    recipeId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {model: 'Recipes'}
    }
  }, {});
  RecipeTag.associate = function(models) {
    // associations can be defined here
  };
  return RecipeTag;
};
