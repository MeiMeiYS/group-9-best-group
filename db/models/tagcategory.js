'use strict';
module.exports = (sequelize, DataTypes) => {
  const TagCategory = sequelize.define('TagCategory', {
    name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(50)
    }
  }, {});
  TagCategory.associate = function(models) {
    // associations can be defined here
    TagCategory.hasMany(models.tag, { foreignKey: 'tagCategoryId'})
  };
  return TagCategory;
};
