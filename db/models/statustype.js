'use strict';
module.exports = (sequelize, DataTypes) => {
  const StatusType = sequelize.define('StatusType', {
    type: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(50)
    }
  }, {});
  StatusType.associate = function(models) {
    // associations can be defined here
  };
  return StatusType;
};
