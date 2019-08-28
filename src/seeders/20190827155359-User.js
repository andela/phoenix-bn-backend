module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'Users',
    [
      {
        username: 'weTravelAdmin',
        email: 'weTravelAdmin@example.com',
        password: 'weTravelAdmin',
        phoneNumber: '070weTravelAdmin',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]
  ),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
};
