module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstName: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: {
        notNull: false,
      },
    },
    lastName: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: {
        notNull: false,
      },
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: {
        notNull: false,
      },
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
        notNull: true,
      },
    },
    phoneNumber: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: {
        notNull: false,
      },
    },
    gender: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    birthdate: {
      allowNull: true,
      type: Sequelize.DATEONLY,
    },
    preferredLanguage: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    preferredCurrency: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    address: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    department: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    lineManager: {
      allowNull: true,
      type: Sequelize.INTEGER,
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
  down: (queryInterface) => queryInterface.dropTable('User')
};
