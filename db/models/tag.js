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
      reference: { model: TagCategories }
    }
  }, {});
  Tag.associate = function(models) {
    // associations can be defined here
    Tag.belongsTo(models.tagCategory, { foreignKey: 'tagCategoryId'})
  };
  return Tag;
};
