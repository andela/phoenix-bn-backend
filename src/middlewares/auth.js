import utils from '../utils';
import ResponseMsg from '../utils/responseMessages';

const { resError } = ResponseMsg;
/**
 * Auth middleware Class
 */
class Auth {
  /**
   * verifyToken
   * @param { Object } req
   * @param { Object } res
   * @param { Object } next
   * @returns { Object } response object with error messages or passes control to the next function
   * @description checks if the token is provided, valid or invalid
   * @memberof Auth
   */
  static async verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return resError(res, 401, 'No Authentication token');
    }
    try {
      const payload = utils.decodeToken(token.split(' ')[1]);
      req.user = { ...payload };
      return next();
    } catch (error) {
      return resError(res, 401, 'the token you have provided is invalid');
    }
  }

  /**
   * validateToken
   * @param { Object } req
   * @param { Object } res
   * @param { Object } next
   * @returns { Object } response object with error messages or passes control to the next function
   * @description checks if the token is provided, valid or invalid
   * @memberof Auth
   */
  static async validateToken(req, res, next) {
    const { token } = req.params;
    if (!token) {
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized access',
      });
    }
    try {
      utils.decodeToken(token);
      return next();
    } catch (error) {
      return res.status(403).json({
        status: 403,
        error: 'Unauthorized Access: Token Expired',
      });
    }
  }
}

export default Auth;
