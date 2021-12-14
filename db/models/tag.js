'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(50)
    },
    tagCategoryId: {
      type: DataTypes.INTEGER,
      references: { model: 'TagCategories' }
    }
  }, {});
  Tag.associate = function(models) {
    // associations can be defined here
    const recipeMapping = {
      through: 'RecipeTag',
      otherKey: 'recipeId',
      foreignKey: 'tagId'
    }

    Tag.belongsToMany(models.Recipe, recipeMapping);

    

    Tag.belongsTo(models.tagCategory, { foreignKey: 'tagCategoryId'})
  };
  return Tag;
};
