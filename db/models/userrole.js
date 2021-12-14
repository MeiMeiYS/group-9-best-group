'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    userId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER
  }, {});
  UserRole.associate = function(models) {
    // associations can be defined here
  };
  return UserRole;
};