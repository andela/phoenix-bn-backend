import userServices from '../services/userServices';
import ResponseMsg from '../utils/responseMessages';

const { resError } = ResponseMsg;

/**
 * User Middlewares Class
 */
export default class UserMiddlewares {
/**
 * @name checkUserExists
 * @description Checks if a user exists in the database
 * @param {object} req The request object
 * @param {object} res The response object
 * @param {object} next The response object
 * @returns {object} The API response or next()
 */
  static async checkUserExists(req, res, next) {
    try {
      const { email } = req.body;
      const data = await userServices.getUserByEmail(email);
      if (!data) return next();
      return resError(res, 409, 'Unsuccesful, user already exists, kindly use a different email.');
    } catch (error) {
      return resError(res, 500, error.message);
    }
  }

  /**
 * @name checkUserExistBeforeLogin
 * @description Checks if a user exists in the database
 * @param {object} req The request object
 * @param {object} res The response object
 * @param {object} next The response object
 * @returns {object} The API response or next()
 */
  static async checkUserExistBeforeLogin(req, res, next) {
    try {
      const { email } = req.body;
      const data = await userServices.getUserByEmail(email);
      if (data) {
        req.user = data.dataValues;
        return next();
      }
      return resError(res, 404, 'User does not exist.');
    } catch (error) {
      return resError(res, 500, error.message);
    }
  }

  /**
 * @name confirmUserExists
 * @description Checks if a user exists in the database
 * @param {object} req The request object
 * @param {object} res The response object
 * @param {object} next The response object
 * @returns {object} The API response or next()
 */
  static async confirmUserExists(req, res, next) {
    try {
      const { user } = req;
      const data = await userServices.getUserByEmail(user.email);
      if (data) return next();
      return resError(res, 409, 'Unsuccesful, User does not exist. Please contact Admin');
    } catch (error) {
      return resError(res, 500, error.message);
    }
  }
}
