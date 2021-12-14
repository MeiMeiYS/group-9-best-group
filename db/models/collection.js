'use strict';
module.exports = (sequelize, DataTypes) => {
  const Collection = sequelize.define('Collection', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Collection.associate = function (models) {
    Collection.belongsTo(models.User, {foreignKey: 'userId'});

    const columnMapping = {
      through: 'RecipeCollection',
      otherKey: 'recipeId',
      foreignKey: 'collectionId'
    }

    Collection.belongsToMany(models.Recipe, columnMapping)

  };
  return Collection;
};
