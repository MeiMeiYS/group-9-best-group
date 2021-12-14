'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecipeCollection = sequelize.define('RecipeCollection', {
    recipeId: {
      type: DataTypes.INTEGER,
      references: { model: 'Recipes' },
      allowNull: false
    },
    collectionId: {
      type: DataTypes.INTEGER,
      references: { model: 'Collections' },
      allowNull: false
    }
  }, {});
  RecipeCollection.associate = function(models) {
    // associations can be defined here

  };
  return RecipeCollection;
};
