import { check } from 'express-validator';
import ResponseMsg from '../utils/responseMessages';

const { resError } = ResponseMsg;

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
  check('phoneNumber').isNumeric().withMessage('It has to be a valid phone number'),
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

const rememberInfoValidation = [
  check('rememberInfo').trim().not().isEmpty()
    .withMessage('rememberInfo field cannot be empty'),
  check('rememberInfo').isBoolean().withMessage('rememberInfo should be a boolean'),
];

export default {
  emailValidation,
  userValidation,
  userLoginValidation,
  rememberInfoValidation,
};
