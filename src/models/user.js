export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      allowNull: true,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: true,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    birthDate: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    residence: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    lineManager: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    preferredLanguage: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    preferredCurrency: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    department: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    gender: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
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
    phoneNumber: {
      allowNull: true,
      type: DataTypes.STRING
    }
  });
  return User;
};
