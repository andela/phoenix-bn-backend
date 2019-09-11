module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Users', 'isVerified', {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }),
  down: (queryInterface) => queryInterface.removeColumn('Users', 'isVerified')
};
