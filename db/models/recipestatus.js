'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecipeStatus = sequelize.define('RecipeStatus', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {model: 'Users'}
    },
    recipeId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {model: 'Recipes'}
    },
    statusId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {model: 'StatusTypes'}
    }
  }, {});
  RecipeStatus.associate = function(models) {
    // associations can be defined here
  };
  return RecipeStatus;
};
