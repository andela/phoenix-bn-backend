import https from 'https';
import Linkedn from 'node-linkedin';
import Utils from '../utils';
import UserServices from '../services/userServices';
import ResponseMsg from '../utils/responseMessages';
import NotifyUser from '../utils/notification';

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
 * @description Allows an admin add a new user and sends email verification to user
 * @param {object} req The request object
 * @param {object} res The response object
 * @returns {object} The API response
 */
  static async createUser(req, res) {
    try {
      const { email } = req.body;
      const randomPassword = 'password'; // Utils.randomPassword();
      const password = Utils.hashPassword(randomPassword);
      const data = await UserServices.createUser({ email, password });
      const { id } = data;
      const token = Utils.generateToken({ id, email });
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
      const isCorrectPassword = Utils.comparePassword(password, user.password);

      if (isCorrectPassword) {
        delete user.password;
        const { id, email } = user;
        const token = Utils.generateToken({ id, email });
        res.set('Authorization', `Bearer ${token}`);
        return resSuccess(res, 200, user);
      }
      if (!isCorrectPassword) {
        return resError(res, 401, 'Inavalid email/password.');
      }
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

  /**
 * @name forgetPassword
 * @description User enters email address to receive a resetpassword link
 * @param {object} req The request object
 * @param {object} res The response object
 * @returns {object} The API response
 */
  static async forgetPassword(req, res) {
    try {
      const { email } = req.body;
      const { baseUrl } = req;
      const { host } = req.headers;
      const uri = host + baseUrl;
      const { id } = await UserServices.getUserByEmail(email);
      const token = Utils.generateToken({ email, id }, '20m');

      const link = `http://${uri}/resetpassword/${token}`;
      NotifyUser.resetPassword(email, link);
      return resSuccess(res, 200, {
        message: 'Your password reset link has been sent'
      });
    } catch (error) {
      return resError(res, 500, error.message);
    }
  }

  /**
 * @name forgetPassword
 * @description User updates their password
 * @param {object} req The request object
 * @param {object} res The response object
 * @returns {object} The API response
 */
  static async resetPassword(req, res) {
    try {
      const { token } = req.params;
      const { password } = req.body;
      const { id } = Utils.decodeToken(token);
      const newPassword = Utils.hashPassword(password);
      await UserServices.updateUserById({
        name: 'password',
        value: newPassword
      }, id);
      return resSuccess(res, 200, {
        message: 'Password Successfully Changed'
      });
    } catch (error) {
      return resError(res, 500, error.message);
    }
  }
}
