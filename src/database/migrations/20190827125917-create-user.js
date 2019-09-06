module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstName: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    lastName: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    password: {
      allowNull: true,
      type: Sequelize.STRING,
      defaultValue: 'password',
    },
    lastLogin: {
      allowNull: true,
      type: Sequelize.DATE
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    birthDate: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    residenceAddress: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    lineManager: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    preferredLanguage: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    preferredCurrency: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    department: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    gender: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    phoneNumber: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    isAdmin: {
      allowNull: true,
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    rememberInfo: {
      allowNull: true,
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      validate: {
        notNull: true,
      },
    },
    isVerified: {
      allowNull: true,
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('Users')
};
