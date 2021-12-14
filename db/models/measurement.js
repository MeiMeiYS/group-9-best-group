'use strict';
module.exports = (sequelize, DataTypes) => {
  const Measurement = sequelize.define('Measurement', {
    type: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(50)
    }
  }, {});
  Measurement.associate = function(models) {
    // associations can be defined here
    Measurement.hasMany(models.RecipeIngredient, {foreignKey: 'measurementId'})
  };
  return Measurement;
};
