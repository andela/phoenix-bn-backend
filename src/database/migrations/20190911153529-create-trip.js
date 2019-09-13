module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Trips', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
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
    status: {
      allowNull: false,
      type: Sequelize.ENUM,
      values: ['accepted', 'rejected', 'pending'],
      defaultValue: 'pending',
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Users'
        },
        key: 'id'
      },
      allowNull: false
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
  down: (queryInterface) => queryInterface.dropTable('Trips')
};
