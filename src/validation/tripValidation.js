import { check } from 'express-validator';
import moment from 'moment';
import ResponseMsg from '../utils/responseMessages';

const { resError } = ResponseMsg;

const dateFormat = (req, res, next) => {
  const dateCheck = moment(req.body.travelDate).format('YYYY-MM-DD');
  if (dateCheck === 'Invalid date') {
    return resError(res, 406, 'Please input date in YYYY-MM-DD format');
  }
  return next();
};

const tripInputValidation = [
  check('origin').trim().not().isEmpty()
    .withMessage('Origin field cannot be empty'),
  check('destination').trim().not().isEmpty()
    .withMessage('Destination field cannot be empty'),
  check('accommodation').trim().not().isEmpty()
    .withMessage('Accomodation field cannot be empty'),
  check('travelDate').trim().not().isEmpty()
    .withMessage('Date of travel field cannot be empty'),
  check('travelReasons').trim().not().isEmpty()
    .withMessage('Reason for travel field cannot be empty'),
];

const multiCityTripInputValidation = [
  check('origin').trim().not().isEmpty()
    .withMessage('Origin field cannot be empty'),
  check('destination').trim().not().isEmpty()
    .withMessage('Destination field cannot be empty'),
  check('accommodation').trim().not().isEmpty()
    .withMessage('Accomodation field cannot be empty'),
  check('travelDate').trim().not().isEmpty()
    .withMessage('Date of travel field cannot be empty'),
  check('travelReasons').trim().not().isEmpty()
    .withMessage('Reason for travel field cannot be empty'),
];


export default { dateFormat, tripInputValidation, multiCityTripInputValidation };
