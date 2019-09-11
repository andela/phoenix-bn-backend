import { check } from 'express-validator';
import ResponseMsg from '../utils/responseMessages';

const { resError } = ResponseMsg;

export const userSignupValidation = [
  /* check('firstName').trim().not().isEmpty()
    .withMessage('First name field cannot be empty.'),
  check('lastName').trim().not().isEmpty()
    .withMessage('last name field cannot be empty.'),
  check('userName').trim().not().isEmpty()
    .withMessage('username field cannot be empty.'),
  check('userName').isAlphanumeric().withMessage('username should contain only letters and numbers'), */
  check('email').trim().not().isEmpty()
    .withMessage('Email field cannot be empty'),
  check('email').isEmail().withMessage('Enter valid email address.'),
  check('email').normalizeEmail(),
  /* check('password').trim().not().isEmpty()
    .withMessage('Please password is required'),
  check('password').isLength({ min: 8 }).withMessage('Password should be atleast 8 characters'),
  check('password').isAlphanumeric().withMessage('Password should contain only letters and numbers'),
  check('phoneNumber').isNumeric().withMessage('It has to be a valid phone number'), */
];

export const userLoginValidation = [
  check('email').trim().not().isEmpty()
    .withMessage('Email field cannot be empty'),
  check('email').isEmail().withMessage('Enter valid email address.'),
  check('email').normalizeEmail(),
  check('password').trim().not().isEmpty()
    .withMessage('Please password is required'),
  check('password').isLength({ min: 8 }).withMessage('Password should be atleast 8 characters'),
  check('password').isAlphanumeric().withMessage('Password should contain only letters and numbers'),
];

export const createUserRole = [
  check('email').trim().not().isEmpty()
    .withMessage('Email field cannot be empty'),
  check('email').isEmail().withMessage('Enter valid email address.'),
  check('email').normalizeEmail(),
];

export const sentUserRoleValidation = (res, req, next) => {
  try {
    const { role } = req.body;
    const sentRole = role.toLowerCase();
    if (sentRole === '') {
      req.body.role = 'requester';
      next();
    } else if (sentRole !== ''
      && sentRole !== 'manager'
      && sentRole !== 'traval team member'
      && sentRole !== 'travel administrator'
      && sentRole !== 'super admonistrator') {
      return resError(res, 400, 'Incorrect role type sent.');
    }
    next();
  } catch (error) {
    resError(res, 500, error.message);
  }
};
