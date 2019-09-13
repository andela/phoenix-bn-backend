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
      unique: { args: true, msg: 'This email is already registered. Login.' },
      validate: {
        isEmail: true,
      },
    },
    phoneNumber: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    rememberInfo: {
      allowNull: true,
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      validate: {
        notNull: true,
      },
    },
    gender: {
      allowNull: true,
      type: Sequelize.STRING,
      validate: {
        notNull: false,
      },
    },
    birthdate: {
      allowNull: true,
      type: Sequelize.DATEONLY,
      validate: {
        notNull: false,
      },
    },
    preferredLanguage: {
      allowNull: true,
      type: Sequelize.STRING,
      validate: {
        notNull: false,
      },
    },
    preferredCurrency: {
      allowNull: true,
      type: Sequelize.STRING,
      validate: {
        notNull: false,
      },
    },
    address: {
      allowNull: true,
      type: Sequelize.STRING,
      validate: {
        notNull: false,
      },
    },
    department: {
      allowNull: true,
      type: Sequelize.STRING,
      validate: {
        notNull: false,
      },
    },
    lineManager: {
      allowNull: true,
      type: Sequelize.INTEGER,
      validate: {
        notNull: false,
      },
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
