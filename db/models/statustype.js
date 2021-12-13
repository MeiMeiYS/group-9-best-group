'use strict';
module.exports = (sequelize, DataTypes) => {
  const StatusType = sequelize.define('StatusType', {
    type: DataTypes.STRING
  }, {});
  StatusType.associate = function(models) {
    // associations can be defined here
  };
  return StatusType;
};