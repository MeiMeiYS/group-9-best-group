'use strict';
module.exports = (sequelize, DataTypes) => {
  const Measurement = sequelize.define('Measurement', {
    type: DataTypes.STRING
  }, {});
  Measurement.associate = function(models) {
    // associations can be defined here
  };
  return Measurement;
};