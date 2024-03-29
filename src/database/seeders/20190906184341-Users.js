import { config } from 'dotenv';
import Utils from '../../utils';

config();

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Users',
    [
      {
        firstName: 'Wetravel',
        lastName: 'user1',
        email: 'wetravel.user1@gmail.com',
        password: Utils.hashPassword(process.env.SECRET),
        phoneNumber: 12345678,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'chidi',
        lastName: 'nma',
        email: 'chidimma@gmail.com',
        password: Utils.hashPassword(process.env.SECRET),
        phoneNumber: 12345678,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),
  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {})
};
