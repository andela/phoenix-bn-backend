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
      validate: {
        notNull: true
      }
    },
    lastName: {
      allowNull: true,
      type: Sequelize.STRING,
      validate: {
        notNull: true
      }
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: {
        notNull: true
      }
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
        notNull: true
      }
    },
    phoneNumber: {
      allowNull: true,
      type: Sequelize.STRING,
      validate: {
        notNull: true
      }
    },
    birthDate: {
      allowNull: true,
      type: Sequelize.STRING,
      validate: {
        notNull: true
      }
    },
    residence: {
      allowNull: true,
      type: Sequelize.STRING,
      validate: {
        notNull: true
      }
    },
    LineManager: {
      allowNull: true,
      type: Sequelize.STRING,
      validate: {
        notNull: true
      }
    },
    preferredLanguage: {
      allowNull: true,
      type: Sequelize.STRING,
      validate: {
        notNull: true
      }
    },
    preferredCurrency: {
      allowNull: true,
      type: Sequelize.STRING,
      validate: {
        notNull: true
      }
    },
    department: {
      allowNull: true,
      type: Sequelize.STRING,
      validate: {
        notNull: true
      }
    },
    role: {
      allowNull: true,
      type: Sequelize.STRING,
      validate: {
        notNull: true
      }
    },
    gender: {
      allowNull: true,
      type: Sequelize.STRING,
      validate: {
        notNull: true
      }
    },
    isAdmin: {
      allowNull: true,
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      validate: {
        notNull: true
      }
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
