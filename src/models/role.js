export default (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    roleName: {
      allowNull: false,
      type: DataTypes.STRING,
    }
  }, {});
  Role.associate = (models) => {
    Role.belongsToMany(models.User, {
      through: 'UserRole',
      foreignKey: 'roleId'
    });
  };
  return Role;
};
