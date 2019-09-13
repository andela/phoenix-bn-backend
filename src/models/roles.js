export default (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    userEmail: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    roleName: {
      allowNull: false,
      type: DataTypes.STRING,
    }
  }, {});
  Roles.associate = (models) => {
    Roles.belongsTo(models.Users, {
      foreignKey: 'userEmail',
      targetKey: 'email'
    });
  };
  return Roles;
};
