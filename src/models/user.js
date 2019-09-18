export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    firstName: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'password'
    },
    isAdmin: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    lastLogin: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW')
    },
    rememberInfo: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    lineManager: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    phoneNumber: {
      allowNull: true,
      type: DataTypes.STRING
    },
  }, {});
  User.associate = (models) => {
    User.hasMany(models.Request, {
      foreignKey: 'userId',
      as: 'requests',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return User;
};
