module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    content: DataTypes.STRING,
    complete: DataTypes.BOOLEAN
  }, {});
  return User;
};
