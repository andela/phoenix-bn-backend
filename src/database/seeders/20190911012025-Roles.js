module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Roles',
    [
      {
        roleName: 'Super Administrator',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleName: 'Manager',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleName: 'Super Administrator',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleName: 'Manager',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleName: 'Requester',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleName: 'Requester',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleName: 'Manager',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleName: 'Travel Administrator',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleName: 'Travel Team Member',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleName: 'Requester',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleName: 'Travel Team Member',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleName: 'Requester',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleName: 'Travel Team Member',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleName: 'Requester',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Roles', null, {})
};
