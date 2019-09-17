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
    const role = await models.Roles.create({ roleName: roleData.roleName })
      .then(async (result) => {
        await models.UsersRoles.create({
          userId: roleData.userId,
          roleId: result.dataValues.id
        });
        return result.dataValues;
      });
    return role;
  }
}
