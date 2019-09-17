export default (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    /* userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    userEmail: {
      allowNull: false,
      type: DataTypes.STRING,
    }, */
    roleName: {
      allowNull: false,
      type: DataTypes.STRING,
    }
  }, {});
  Roles.associate = (models) => {
    Roles.belongsToMany(models.Users, {
      through: 'UsersRoles',
      as: 'users',
      foreignKey: 'roleId',
      otherKey: 'userId'
    });
  };
  return Roles;
};
