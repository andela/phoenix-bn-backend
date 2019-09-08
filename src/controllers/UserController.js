import UserServices from '../services/userServices';
import Utils from '../utils';

/**
 * User controller Class
 */
export default class UserController {
/**
 * @name CreateUser
 * @description Allows an admin add a new user
 * @param {object} req The request object
 * @param {object} res The response object
 * @returns {object} The API response
 */
  static async createUser(req, res) {
    try {
      const userData = { ...req.body };
      userData.password = Utils.hashPassword(userData.password);
      const data = await UserServices.createUser(userData);
      return res.status(201).json({
        status: 201,
        message: 'User successfuly created',
        data,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
 * @name getUser
 * @description Allows user to sign in user
 * @param {object} req The request object
 * @param {object} res The response object
 * @returns {object} The API response
 */
  static async getUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserServices.loginUser(email);

      if (user && Utils.comparePassword(password, user.password)) {
        delete user.password;
        return res.status(200).json({
          status: 200,
          data: user
        });
      }
      if (user && !Utils.comparePassword(password, user.password)) {
        return res.status(400).json({
          status: 400,
          error: 'Inavalid email/password.'
        });
      }
    } catch (error) {
      let err = '';
      if (error.message === 'Illegal arguments: string, undefined') {
        err = 'User does not exist.';
      }
      return res.status(400).json({
        status: 400,
        error: err
      });
    }
  }
}
