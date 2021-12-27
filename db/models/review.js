'use strict';
module.exports = (sequelize, DataTypes) => {

  const randomReviewImage = () => {
    return (Math.floor(Math.random()*9) + 10).toString()
  }

  const Review = sequelize.define('Review', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: 'Users'}
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: 'Recipes'}
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageId: {
      type: DataTypes.INTEGER,
      references: { model: 'Images' },
      defaultValue: randomReviewImage(),
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.Recipe, { foreignKey: 'recipeId' });
    Review.belongsTo(models.User, { foreignKey: 'userId' });
    Review.belongsTo(models.Image, { foreignKey: 'imageId' });
  };
  return Review;
};
