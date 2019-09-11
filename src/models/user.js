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
    lastLogin: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW')
    },
    phoneNumber: {
      allowNull: true,
      type: DataTypes.STRING
    },
    gender: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    birthdate: {
      allowNull: true,
      type: DataTypes.DATEONLY,
    },
    preferredLanguage: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    preferredCurrency: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    address: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    department: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    lineManager: {
      allowNull: true,
      type: DataTypes.INTEGER,
    }
  });
  User.associate = (models) => {
    User.belongsToMany(models.Role, {
      through: 'UserRole',
      foreignKey: 'userId',
    });
  };
  return User;
};
