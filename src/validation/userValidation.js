import { check } from 'express-validator';

const userValidation = [
  check('firstName').trim().not().isEmpty()
    .withMessage('First name field cannot be empty.'),
  check('lastName').trim().not().isEmpty()
    .withMessage('last name field cannot be empty.'),
  check('password').trim().not().isEmpty()
    .withMessage('Please password is required'),
  check('password').isLength({ min: 8 }).withMessage('Password should be atleast 8 characters'),
  check('password').isAlphanumeric().withMessage('Password should contain only letters and numbers'),
  check('department').trim().not().isEmpty()
    .withMessage('department field cannot be empty'),
  check('gender').trim().not().isEmpty()
    .withMessage('gender field cannot be empty'),
  check('phoneNumber').trim().not().isEmpty()
    .withMessage('phone Number field cannot be empty'),
  check('residenceAddress').trim().not().isEmpty()
    .withMessage('address of residence field cannot be empty'),
  check('birthDate').trim().not().isEmpty()
    .withMessage('birthday field cannot be empty'),
  check('preferredLanguage').trim().not().isEmpty()
    .withMessage('peferred Language field cannot be empty'),
];

const userLoginValidation = [
  check('email').trim().not().isEmpty()
    .withMessage('Email field cannot be empty'),
  check('email').isEmail().withMessage('Enter valid email address.'),
  check('email').normalizeEmail(),
  check('password').trim().not().isEmpty()
    .withMessage('Please password is required'),
  check('password').isLength({ min: 8 }).withMessage('Password should be atleast 8 characters'),
  check('password').isAlphanumeric().withMessage('Password should contain only letters and numbers'),
];

const emailValidation = [
  check('email').trim().not().isEmpty()
    .withMessage('Email field cannot be empty'),
  check('email').isEmail().withMessage('Enter valid email address.'),
  check('email').normalizeEmail(),
];

export default { emailValidation, userValidation, userLoginValidation };
