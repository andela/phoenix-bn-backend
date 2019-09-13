import models from '../models';

/**
 * Role service Class
 */
export default class RoleServices {
  /**
 * @name CreateRole
 * @description Interacts with model to create a new user role
 * @param { string } roleData the user's data
 * @returns {object} return the updated field
 */
  static async createRole(roleData) {
    const { dataValues } = await models.Roles.create(roleData);
    return dataValues;
  }

  /**
 * @name getRoleByUserEmail
 * @description Interacts with model to get a role by user's email
 * @param { string } email the user's data
 * @returns {object} return the updated field
 */
  static async getRolesByUserEmail(email) {
    const data = await models.Roles.findAll({ where: { userEmail: email } });
    return data;
  }
}
