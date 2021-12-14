'use strict';
module.exports = (sequelize, DataTypes) => {
  const Collection = sequelize.define('Collection', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Collection.associate = function (models) {
    Collection.belongsTo(model.User, {foreignKey: 'userId'});
  };
  return Collection;
};
