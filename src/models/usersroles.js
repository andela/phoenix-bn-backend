module.exports = (sequelize, DataTypes) => {
  const UsersRoles = sequelize.define('UsersRoles', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    roleId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  UsersRoles.associate = function (models) {
    // associations can be defined here
  };
  return UsersRoles;
};
