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
   * @name LoginUser
   * @description Interacts with model to sign in a user
   * @param { string } email the user's email
   * @returns { object } returns the user's data
   */
  static async loginUser(email) {
    const data = await this.getUserByEmail(email)
      .then((result) => result.dataValues)
      .catch((error) => error);
    return data;
  }
}
