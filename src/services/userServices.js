import models from '../models';

/**
 * User service Class
 */
export default class UserServices {
  /**
   * @name CreateUser
   * @description Interacts with model to create a new user
   * @param { string } userData the user's data
   * @returns {object} return the updated field
   */
  static async createUser(userData) {
    const { dataValues } = await models.User.create(userData);
    delete dataValues.password; // remove sensitive data from returned object
    return dataValues;
  }

  /**
   * @name GetUserByEmail
   * @description Interacts with model to find a single user
   * @param { string } email the user's email
   * @returns {object} return the user's data
   */
  static async getUserByEmail(email) {
    const data = await models.User.findOne({ where: { email } });
    return data;
  }

  /**
   * @name UpdateRememberInfo
   * @description Updates the remember info column in the user's table
   * @param { string } id the user's id
   * @param { object } rememberInfo the field to be updated with the value
   * @returns {object} return the user's data
   */
  static async UpdateRememberInfo(id, rememberInfo) {
    const data = await models.User.update({ rememberInfo }, { where: { id } });
    if (data[0] === 0) throw new Error('could not update user field');
  }

  /**
   * @name GetUserById
   * @description Interacts with model to find a single user
   * @param { string } id the user's id
   * @returns {object} return the user's data
   */
  static async getUserById(id) {
    const userDetails = await models.User.findOne({ where: { id, } });
    return userDetails;
  }
}
