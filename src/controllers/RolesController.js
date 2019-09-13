import RolesServices from '../services/RolesServices';
import ResponseMsg from '../utils/responseMessages';

const { resSuccess, resError } = ResponseMsg;
/**
 * Roles controller Class
 */
export default class RolesController {
  /**
   * @name createRole
   * @description Allows an admin create a new role for a user
   * @param {object} req The request object
   * @param {object} res The response object
   * @returns {object} The API response
   */
  static async createRole(req, res) {
    try {
      const { role } = req.body;
      const { id } = req.user;
      const roleData = {
        userId: id,
        roleName: role
      };
      const data = await RolesServices.createRole(roleData);
      return resSuccess(res, 201, data);
    } catch (error) {
      return resError(res, 500, error.message);
    }
  }
}
