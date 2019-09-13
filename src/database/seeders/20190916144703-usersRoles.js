
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('UsersRoles',
    [
      {
        userId: 1,
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        roleId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        roleId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 4,
        roleId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 5,
        roleId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 5,
        roleId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 5,
        roleId: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 5,
        roleId: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 6,
        roleId: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 6,
        roleId: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 7,
        roleId: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 7,
        roleId: 14,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('UsersRoles', null, {})
};
