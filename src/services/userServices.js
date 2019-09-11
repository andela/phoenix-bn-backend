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
  * @name GetUserById
  * @description Interacts with model to find a single user
  * @param { string } id the user's email
  * @returns {object} return the user's data
  */
  static async getUserById(id) {
    const data = await models.User.findOne({ where: { id } });
    return data;
  }

  /**
  * @name updateUserInfoById
  * @description Interacts with model to find a single user
  * @param { object } attribute the user attribute to update
  * @param { string } id the user's id
  * @returns {object} return the user's data
  */
  static async updateUserInfoById(attribute, id) {
    const {
      firstName, lastName, birthDate, preferredLanguage, preferredCurrency, residenceAddress,
      gender, department, lineManager, phoneNumber
    } = attribute;
    const userDetails = await models.User.update({
      firstName,
      lastName,
      birthDate,
      preferredLanguage,
      preferredCurrency,
      gender,
      residenceAddress,
      lineManager,
      department,
      phoneNumber,
    },
    { where: { id }, returning: true, plain: true });
    return userDetails;
  }
}
