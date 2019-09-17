import ResponseMsg from '../utils/responseMessages';
import Utils from '../utils';

const { resError } = ResponseMsg;

/**
 * Roles Middlewares Class
 */
export default class RolesMiddlewares {
  /**
 * @name checkRoleExistForUser
 * @description Checks if a user already has the that's to be assigned to them
 * @param {object} req The request object
 * @param {object} res The response object
 * @param {object} next The response object
 * @returns {object} The API response or next()
 */
  static async checkRoleExistForUser(req, res, next) {
    try {
      const { role } = req.body;
      const { roles } = req.user;
      const userRoles = Utils.extractRoles(roles);
      if (!userRoles.includes(role)) {
        return next();
      }
      return resError(res, 409, 'User already has this role.');
    } catch (error) {
      return resError(res, 500, error.message);
    }
  }
}
