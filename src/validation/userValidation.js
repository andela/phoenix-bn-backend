import { check } from 'express-validator';
import ResponseMsg from '../utils/responseMessages';

const { resError } = ResponseMsg;

const userValidation = [
  check('firstName').trim().not().isEmpty()
    .withMessage('First name field cannot be empty.'),
  check('lastName').trim().not().isEmpty()
    .withMessage('last name field cannot be empty.'),
  check('userName').trim().not().isEmpty()
    .withMessage('username field cannot be empty.'),
  check('userName').isAlphanumeric().withMessage('username should contain only letters and numbers'),
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

/**
 * @name sentUserRoleValidation
 * @description validate sent user role
 * @param {object} req The request object
 * @param {object} res The response object
 * @param {object} next The response object
 * @returns {object} The API response or next()
 */
const sentUserRoleValidation = (req, res, next) => {
  try {
    let role = 'Requester';
    if (req.body.role) role = req.body.role.toLowerCase();
    if (role !== 'Requester'
      && role !== 'requester'
      && role !== 'manager'
      && role !== 'traval team member'
      && role !== 'travel administrator'
      && role !== 'super admonistrator') {
      return resError(res, 400, 'Incorrect role type sent.');
    }
    req.body.role = role.charAt(0).toUpperCase() + role.slice(1);
    return next();
  } catch (error) {
    resError(res, 500, error.message);
  }
};

export default {
  userValidation, userLoginValidation, emailValidation, sentUserRoleValidation,
};
