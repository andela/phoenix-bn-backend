module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Role',
    [
      {
        userId: 1,
        roleName: 'Super Administrator',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        roleName: 'Manager',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        roleName: 'Super Administrator',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        roleName: 'Manager',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        roleName: 'Requester',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 4,
        roleName: 'Requester',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 5,
        roleName: 'Manager',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 5,
        roleName: 'Travel Administrator',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 5,
        roleName: 'Travel Team Member',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 5,
        roleName: 'Requester',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 6,
        roleName: 'Travel Team Member',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 6,
        roleName: 'Requester',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 7,
        roleName: 'Travel Team Member',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 7,
        roleName: 'Requester',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Role', null, {})
};
