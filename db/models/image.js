'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    url: DataTypes.STRING
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
    Image.hasOne(models.Review, { foreignKey: 'imageId' });
    Image.hasOne(models.Recipe, { foreignKey: 'imageId' });
    Image.hasOne(models.User, { foreignKey: 'imageId' });

  };
  return Image;
};
