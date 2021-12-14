'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    userId: {
      allowNull: false,
      unique: true,
      type: Sequelize.INTEGER,
      reference: { model: Users }
    },
    roleId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      reference: { model: Roles }
    }
  }, {});
  UserRole.associate = function(models) {
    // associations can be defined here

  };
  return UserRole;
};
