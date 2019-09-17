import userServices from '../services/userServices';
import ResponseMsg from '../utils/responseMessages';
import Utils from '../utils';

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
 * @name checkUserIsSuperAdmin
 * @description Checks if a user is super admin
 * @param {object} req The request object
 * @param {object} res The response object
 * @param {object} next The response object
 * @returns {object} The API response or next()
 */
  static async checkUserIsSuperAdmin(req, res, next) {
    try {
      const sentToken = req.get('Authentication');
      let token = '';
      if (!sentToken) {
        return resError(res, 401, 'No authorization token was sent');
      }
      token = sentToken.slice(7, sentToken.length);
      const jwt = Utils.verifyTokenForAdmin(token);
      if (jwt.roles.includes('Super Administrator')) {
        return next();
      }
      return resError(res, 403, 'You are not allowed to perform this operation');
    } catch (error) {
      resError(res, 401, 'Session has expired. Sign in.');
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
      const { email } = req.body;
      const data = await userServices.getUserByEmail(email);
      if (data) {
        req.user = data.dataValues;
        return next();
      }
      return resError(res, 409, 'No user exist for the provided email.');
    } catch (error) {
      return resError(res, 500, error.message);
    }
  }
}
