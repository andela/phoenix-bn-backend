module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Roles',
    [
      {
        userId: 1,
        userEmail: 'abel@gmail.com',
        roleName: 'Super Administrator',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        userEmail: 'abel@gmail.com',
        roleName: 'Manager',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        userEmail: 'dafeanna@gmail.com',
        roleName: 'Super Administrator',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        userEmail: 'wetravel.user1@gmail.com',
        roleName: 'Manager',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        userEmail: 'wetravel.user1@gmail.com',
        roleName: 'Requester',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 4,
        userEmail: 'chidimma@gmail.com',
        roleName: 'Requester',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 5,
        userEmail: 'tolu@gmail.com',
        roleName: 'Manager',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 5,
        userEmail: 'tolu@gmail.com',
        roleName: 'Travel Administrator',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 5,
        userEmail: 'tolu@gmail.com',
        roleName: 'Travel Team Member',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 5,
        userEmail: 'tolu@gmail.com',
        roleName: 'Requester',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 6,
        userEmail: 'albert@gmail.com',
        roleName: 'Travel Team Member',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 6,
        userEmail: 'albert@gmail.com',
        roleName: 'Requester',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 7,
        userEmail: 'igbokwe@gmail.com',
        roleName: 'Travel Team Member',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 7,
        userEmail: 'igbokwe@gmail.com',
        roleName: 'Requester',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Roles', null, {})
};
