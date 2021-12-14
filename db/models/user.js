'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    hashedPassword: {
      allowNull: false,
      type: DataTypes.STRING.BINARY
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    imageId: {
      type: DataTypes.INTEGER
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    const columnMapping = { through: "UserRole", otherKey: "roleId", foreignKey: "userId" }

    User.belongsToMany(models.Role, columnMapping);
  };
  return User;
};
