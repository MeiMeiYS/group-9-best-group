'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    steps: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    imageId: DataTypes.INTEGER
  }, {});
  Recipe.associate = function(models) {
    Recipe.belongsTo(models.User, {foreignKey: 'userId'});
    Recipe.belongsTo(models.Image, {foreignKey: 'imageId'});
  };
  return Recipe;
};
