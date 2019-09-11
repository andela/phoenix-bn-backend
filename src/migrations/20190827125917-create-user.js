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
      allowNull: false,
      type: Sequelize.STRING,
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
      }
    },
    birthDate: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    residence: {
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
    role: {
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
