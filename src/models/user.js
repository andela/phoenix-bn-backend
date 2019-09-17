export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      allowNull: true,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: true,
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    birthDate: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    residenceAddress: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    lineManager: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    preferredLanguage: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    preferredCurrency: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    department: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    gender: {
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
    isAdmin: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    rememberInfo: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    phoneNumber: {
      allowNull: true,
      type: DataTypes.STRING
    },
    isVerified: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {});
  User.associate = (models) => {
    User.hasMany(models.Comment, { foreignKey: 'userId', onDelete: 'CASCADE' });
  }
  return User;
};
