'use strict';
module.exports = (sequelize, DataTypes) => {
  const TagCategory = sequelize.define('TagCategory', {
    name: DataTypes.STRING
  }, {});
  TagCategory.associate = function(models) {
    // associations can be defined here
  };
  return TagCategory;
};