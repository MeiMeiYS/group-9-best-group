'use strict';
module.exports = (sequelize, DataTypes) => {

  const randomRecipeImage = () => {
    return (Math.floor(Math.random()*9) + 1).toString()
  }

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
      type: DataTypes.INTEGER,
      references: { model: 'Users' }
    },
    steps: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    imageId: {
      type: DataTypes.INTEGER,
      references: { model: 'Images' },
      defaultValue: randomRecipeImage()
    }
  }, {});
  Recipe.associate = function (models) {
    Recipe.belongsTo(models.User, { foreignKey: 'userId' });
    Recipe.belongsTo(models.Image, { foreignKey: 'imageId' });
    Recipe.hasMany(models.Review, { foreignKey: 'recipeId' });

    const collectionMapping = {
      through: 'RecipeCollection',
      otherKey: 'collectionId',
      foreignKey: 'recipeId'
    }

    Recipe.belongsToMany(models.Collection, collectionMapping)

    const statusMapping = {
      through: 'RecipeStatus',
      otherKey: 'statusId',
      foreignKey: 'recipeId'
    }

    Recipe.belongsToMany(models.StatusType, statusMapping)


    const userMapping = {
      through: 'RecipeStatus',
      otherKey: 'userId',
      foreignKey: 'recipeId'
    }

    Recipe.belongsToMany(models.User, userMapping)




    const tagMapping = {
      through: 'RecipeTag',
      otherKey: 'tagId',
      foreignKey: 'recipeId'
    }

    Recipe.belongsToMany(models.Tag, tagMapping)


    Recipe.hasMany(models.RecipeIngredient, { foreignKey: 'recipeId' })


  };
  return Recipe;
};
