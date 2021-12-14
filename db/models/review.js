'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    userId: DataTypes.INTEGER,
    recipeId: DataTypes.INTEGER,
    review: DataTypes.STRING,
    imageId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
    Review.belongsTo(models.Recipe, { foreignKey: 'recipeId' });
    Review.belongsTo(models.User, { foreignKey: 'recipeId' });
    Review.belongsTo(models.Image, { foreignKey: 'imageId' });
  };
  return Review;
};
