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
    const data = await models.User.findOne({ where: { email, } });
    return data;
  }
  
  /**
 * @name updateUser
 * @description Interacts with model to update a single user data
 * @param { object } userData the user's email
 * @param { string } email the user's email
 * @returns {object} return the user's data
 */
  static async updateUser(userData, email) {
    const { firstName, lastName, password, phoneNumber } = userData;
    const data = await models.User.update({ firstName, lastName, phoneNumber, password }, { where: { email } });
    return data;
  }
}
