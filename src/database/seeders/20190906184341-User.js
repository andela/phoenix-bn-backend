import { config } from 'dotenv';

config();

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'User',
    [
      {
        firstName: 'Abel',
        lastName: 'Damina',
        email: 'Abel@gmail.com',
        password: process.env.SECRET,
        phoneNumber: 12345678,
        gender: 'male',
        birthdate: '01/02/1986',
        preferredLanguage: 'French',
        preferredCurrency: 'Naira',
        address: 'no 3 Ilupeju road, Ikeja, Lagos state.',
        department: 'IT Deparment',
        lineManager: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Dafe',
        lastName: 'Anna',
        email: 'dafeanna@gmail.com',
        password: process.env.SECRET,
        phoneNumber: 12345678,
        gender: 'male',
        birthdate: '01/02/1986',
        preferredLanguage: 'French',
        preferredCurrency: 'Naira',
        address: 'no 3 Ilupeju road, Ikeja, Lagos state.',
        department: 'IT Deparment',
        lineManager: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Wetravel',
        lastName: 'user1',
        email: 'wetravel.user1@gmail.com',
        password: process.env.SECRET,
        phoneNumber: 12345678,
        gender: 'male',
        birthdate: '01/02/1986',
        preferredLanguage: 'English',
        preferredCurrency: 'Naira',
        address: 'no 3 Ilupeju road, Ikeja, Lagos state.',
        department: 'Accounts',
        lineManager: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'chidi',
        lastName: 'nma',
        email: 'chidimma@gmail.com',
        password: process.env.SECRET,
        phoneNumber: 12345678,
        gender: 'female',
        birthdate: '01/02/1986',
        preferredLanguage: 'French',
        preferredCurrency: 'Naira',
        address: 'no 3 Ilupeju road, Ikeja, Lagos state.',
        department: 'Accounts',
        lineManager: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Tolu',
        lastName: 'nma',
        email: 'tolu@gmail.com',
        password: process.env.SECRET,
        phoneNumber: 12345678,
        gender: 'female',
        birthdate: '01/02/1986',
        preferredLanguage: 'French',
        preferredCurrency: 'Naira',
        address: 'no 3 Ilupeju road, Ikeja, Lagos state.',
        department: 'Travel Department',
        lineManager: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Albert',
        lastName: 'Karl',
        email: 'albert@gmail.com',
        password: process.env.SECRET,
        phoneNumber: 12345678,
        gender: 'male',
        birthdate: '01/02/1986',
        preferredLanguage: 'French',
        preferredCurrency: 'Naira',
        address: 'no 3 Ilupeju road, Ikeja, Lagos state.',
        department: 'Travel Department',
        lineManager: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Igbokwe',
        lastName: 'Fred',
        email: 'igbokwe@gmail.com',
        password: process.env.SECRET,
        phoneNumber: 12345678,
        gender: 'female',
        birthdate: '01/02/1986',
        preferredLanguage: 'French',
        preferredCurrency: 'Naira',
        address: 'no 3 Ilupeju road, Ikeja, Lagos state.',
        department: 'Travel Department',
        lineManager: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('User', null, {})
};
