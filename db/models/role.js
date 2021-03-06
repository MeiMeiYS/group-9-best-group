'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(50),
      unique: true
    }
  }, {});
  Role.associate = function(models) {
    // associations can be defined here
    const userRolesMapping = { through: "UserRole", otherKey: "userId", foreignKey: "roleId" }

    Role.belongsToMany(models.User, userRolesMapping);
  };
  return Role;
};
