module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Requests', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    managerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    statusId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 2,
      references: {
        key: 'id',
        model: 'Statuses'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    tripType: {
      allowNull: false,
      type: Sequelize.ENUM,
      values: ['One Way Trip', 'Two way Trip'],
    },
    origin: {
      allowNull: false,
      type: Sequelize.STRING
    },
    destination: {
      allowNull: false,
      type: Sequelize.STRING
    },
    travelReasons: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    accommodation: {
      allowNull: false,
      type: Sequelize.STRING
    },
    travelDate: {
      allowNull: false,
      type: Sequelize.DATE
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('Requests')
};
