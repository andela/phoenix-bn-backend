import { config } from 'dotenv';

config();

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [{
    firstName: 'phoenix',
    lastName: 'team',
    email: 'superadmin@gmail.com',
    isAdmin: true,
    password: process.env.SECRET,
    phoneNumber: 12345678,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {})
};
