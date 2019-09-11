import models from '../models';

/**
 * Role service Class
 */
export default class RoleServices {
  /**
     * @name CreateRole
     * @description Interacts with model to create a new user role
     * @param { string } userData the user's data
     * @returns {object} return the updated field
     */
  static async createRol(userData) {
    const { dataValues } = await models.User.create(userData);
    delete dataValues.password; // remove sensitive data from returned object
    return dataValues;
  }
}
