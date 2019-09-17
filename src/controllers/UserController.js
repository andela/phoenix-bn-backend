import https from 'https';
import Linkedn from 'node-linkedin';
import dotenv from 'dotenv';
import Utils from '../utils';
import UserServices from '../services/userServices';
import ResponseMsg from '../utils/responseMessages';

dotenv.config();

const scope = ['r_liteprofile', 'w_member_social', 'r_emailaddress'];
const clientId = process.env.LINKENDIN_CLIENT_ID;
const clientSecret = process.env.LINKENDIN_CLIENT_SECRET;
const redirect = process.env.LINKENDIN_REDIRECT_URL;
const Linkedin = Linkedn(clientId, clientSecret, redirect);


const { resSuccess, resSuccessShort, resError } = ResponseMsg;
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
      const { email, role } = req.body;
      const randomPassword = process.env.SECRET; // Utils.randomPassword();
      const password = Utils.hashPassword(randomPassword);
      const data = await UserServices.createUser({ email, password, role });
      const { id } = data;
      delete data.password;
      const token = Utils.generateToken({ id, email, roles: role });
      res.set('Authorization', `Bearer ${token}`);
      return resSuccess(res, 201, data);
    } catch (error) {
      return resError(res, 500, error.message);
    }
  }

  /**
 * @name login
 * @description Allows user to sign in user
 * @param {object} req The request object
 * @param {object} res The response object
 * @returns {object} The API response
 */
  static async login(req, res) {
    try {
      const { user } = req;
      const { password } = req.body;
      if (Utils.comparePassword(password, user.password)) {
        delete user.password;
        const { id, email } = user;
        let { roles } = user;
        roles = Utils.extractRoles(roles);
        const token = Utils.generateToken({ id, email, roles });
        res.set('Authorization', `Bearer ${token}`);
        return resSuccess(res, 200, user);
      }
      return resError(res, 401, 'Inavalid email/password.');
    } catch (error) {
      return resError(res, 500, error.message);
    }
  }

  /**
   *@name getGoogleUrl
   * @param {object} req The request object
   * @param {object} res The response object
   * @returns {object} The API response
   * @memberof User
   */
  static async getGoogleUrl(req, res) {
    try {
      const auth = Utils.createConnection();
      const url = Utils.getConnectionUrl(auth);
      return resSuccess(res, 200, url);
    } catch (error) {
      return resError(res, 500, error.message);
    }
  }

  /**
   * @name getGoogleAccountFromCode
   * @param {*} req Request object
   * @param {*} res Response object
   * @return {json} Returns json object
   * @memberof User
   */
  static async getGoogleAccountFromCode(req, res) {
    try {
      const auth = Utils.createConnection();
      const data = await auth.getToken(req.query.code);
      const token = data.tokens;
      auth.setCredentials(token);
      const plus = Utils.getGooglePlusApi(auth);
      const me = await plus.people.get({ userId: 'me' });
      const email = me.data.emails && me.data.emails.length && me.data.emails[0].value;
      const user = await UserServices.getUserByEmail(email);
      if (!user) {
        return resError(res, 404, 'User not found');
      }
      return resSuccess(res, 200, user);
    } catch (error) {
      return resError(res, 500, error.message);
    }
  }

  /**
   * @name getLinkedinUrl
   * @param {*} req Request object
   * @param {*} res Response object
   * @return {json} Returns json object
   * @memberof User
   */
  static async getLinkedinUrl(req, res) {
    const authurl = Linkedin.auth.authorize(scope);
    const url = authurl;
    return resSuccess(res, 200, url);
  }

  /**
   * @name getLinkedinAccountFromCode
   * @param {*} req Request object
   * @param {*} res Response object
   * @return {json} Returns json object
   * @memberof User
   */
  static async getLinkedinAccountFromCode(req, res) {
    Linkedin.auth.getAccessToken(res, req.query.code, req.query.state, async (err, results) => {
      if (err) return err;
      const accessToken = results.access_token;

      const options = {
        host: 'api.linkedin.com',
        path: '/v2/emailAddress?q=members&projection=(elements*(handle~))',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'cache-control': 'no-cache',
          'X-Restli-Protocol-Version': '2.0.0'
        }
      };

      const profileRequest = https.request(options, (result) => {
        let data = '';
        result.on('data', (chunk) => {
          data += chunk;
        });
        result.on('end', async () => {
          const profileData = JSON.parse(data);
          const email = Object.values(profileData.elements[0])[0].emailAddress;
          const user = await UserServices.getUserByEmail(email);
          if (!user) {
            return resError(res, 404, 'User not found');
          }
          return resSuccess(res, 200, user);
        });
      });
      profileRequest.end();
    });
  }

  /**
 * @name updateUserInfo
 * @description Updates user profile to complete registration
 * @param {object} req The request object
 * @param {object} res The response object
 * @returns {object} The API response
 */
  static async updateUserInfo(req, res) {
    try {
      const userData = { ...req.body };
      const { user } = req;
      const data = await UserServices.updateUserInfoById({ ...userData }, user.email);
      return resSuccess(res, 201, data);
    } catch (error) {
      return resError(res, 500, error.message);
    }
  }

  /**
* @name getUserProfile
* @description gets user profile to complete registration
* @param {object} req The request object
* @param {object} res The response object
* @returns {object} The API response
*/
  static async getUserProfile(req, res) {
    try {
      const { user } = req;
      const { dataValues } = await UserServices.getUserByEmail(user.email);
      delete dataValues.password;
      return resSuccess(res, 201, dataValues);
    } catch (error) {
      return resError(res, 500, error.message);
    }
  }

  /**
   * @name rememberInfo
   * @param {*} req Request object
   * @param {*} res Response object
   * @return {json} Returns json object
   * @memberof User
   */
  static async rememberInfo(req, res) {
    const { id } = req.user;
    const { rememberInfo } = req.body;
    try {
      await UserServices.UpdateRememberInfo(id, rememberInfo);
      return resSuccessShort(res, 200);
    } catch (error) {
      return resError(res, 500, error.message);
    }
  }
}
