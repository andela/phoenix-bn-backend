'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    content: DataTypes.STRING,
    complete: DataTypes.BOOLEAN
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};