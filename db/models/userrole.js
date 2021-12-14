'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    userId: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER,
      references: { model: 'Users' }
    },
    roleId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Roles' }
    }
  }, {});
  UserRole.associate = function(models) {
    // associations can be defined here

  };
  return UserRole;
};
