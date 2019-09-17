export default (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
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
    rememberInfo: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    phoneNumber: {
      allowNull: true,
      type: DataTypes.STRING
    },
    gender: {
      allowNull: true,
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
    lineManager: {
      allowNull: true,
      type: DataTypes.INTEGER,
    }
  });
  Users.associate = (models) => {
    Users.belongsToMany(models.Roles, {
      through: 'UsersRoles',
      as: 'roles',
      foreignKey: 'userId',
      otherKey: 'roleId'
    });
  };
  return Users;
};
