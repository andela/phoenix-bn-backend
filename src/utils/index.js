import bcrypt from 'bcryptjs';
import { google } from 'googleapis';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

config();

const defaultScope = [
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/userinfo.email'
];

const googleConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirect: process.env.GOOGLE_REDIRECT_URL
};

/**
 * @description Utils controller Class
 */
class Utils {
  /**
   * hashPassword
   * @description hashes a password
   * @param { string } password
   * @returns { string } hashed password
   */
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  /**
   * comparePassword
   * @description compares two passwords
   * @param { String } password
   * @param { String } hashedPassword
   * @returns { Boolean } True or false
   */
  static comparePassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  }

  /**
   * generateToken
   * @description generates authentication token
   * @param { Object } payload - { id, isAdmin }
   * @returns { String } token
   */
  static generateToken(payload) {
    return jwt.sign(payload, process.env.SECRET, { expiresIn: '2h' });
  }

  /**
   * @name createConnection
   * @return {json} Returns json object
   * @memberof Utils
   */
  static createConnection() {
    return new google.auth.OAuth2(
      googleConfig.clientId,
      googleConfig.clientSecret,
      googleConfig.redirect
    );
  }

  /**
   * @name getConnectionUrl
   * @return {json} Returns json object
   * @memberof Utils
   * @param { String } auth
   * @description get google connection url
   */
  static getConnectionUrl(auth) {
    return auth.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: defaultScope
    });
  }

  /**
   * @name getGooglePlusApi
   * @return {json} Returns json object
   * @memberof Utils
   * @param { String } auth
   * @description util function to get google api
   */
  static getGooglePlusApi(auth) {
    return google.plus({ version: 'v1', auth });
  }
  
  /**
  * @RandomPassword
  * @description generates a random password
  * @returns { String } random password
  */
  /* static randomPassword() {
   return Math.random().toString(36).slice(3);
 } */

  /**
   * decodeToken
   * @description decodes the token and returns the corresponding payload
   * @param { String } token
   * @returns { Object } payload - { id, email, isAdmin }
   * @memberof Utils
   */
  static decodeToken(token) {
    return jwt.verify(token, process.env.SECRET);
  }
}

  /**
   * generateToken
   * @description generates authentication token
   * @param { Object } payload - { id, isAdmin }
   * @returns { String } token
   */
  static generateToken(payload) {
    return jwt.sign(payload, process.env.SECRET, { expiresIn: '2h' });
  }
}
export default Utils;
