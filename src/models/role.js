export default (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    roleName: {
      allowNull: true,
      type: DataTypes.STRING
    },
  });

  Role.associate = (models) => {
    Role.belongsToMany(models.User, {
      through: 'UserRole',
      as: 'user',
      foreignKey: 'roleId'
    });
  };
  return Role;
};
