import { check } from 'express-validator';

const userValidation = [
  check('firstName').trim().not().isEmpty()
    .withMessage('First name field cannot be empty.'),
  check('lastName').trim().not().isEmpty()
    .withMessage('last name field cannot be empty.'),
  check('email').trim().not().isEmpty()
    .withMessage('Email field cannot be empty'),
  check('email').isEmail().withMessage('Enter valid email address.'),
  check('email').normalizeEmail(),
  check('password').trim().not().isEmpty()
    .withMessage('Please password is required'),
  check('password').isLength({ min: 8 }).withMessage('Password should be atleast 8 characters'),
  check('password').isAlphanumeric().withMessage('Password should contain only letters and numbers'),
  check('birthDate').isNumeric().withMessage('It has to be a valid phone number'),
  check('residence').isNumeric().withMessage('It has to be a valid phone number'),
  check('gender').isNumeric().withMessage('It has to be a valid phone number'),
  check('prefferedCurrency').isNumeric().withMessage('It has to be a valid phone number'),
  check('preferredLanguage').isNumeric().withMessage('It has to be a valid phone number'),
  check('department').isNumeric().withMessage('It has to be a valid phone number'),
  check('lineManager').isNumeric().withMessage('It has to be a valid phone number'),
  check('phoneNumber').isNumeric().withMessage('It has to be a valid phone number'),
];

export default userValidation;
