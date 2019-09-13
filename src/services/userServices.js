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
    const { email, password, role } = userData;
    const user = await models.sequelize.transaction(async (t) => {
      const newUser = await models.Users.create({ email, password }, { transaction: t })
        .then((result) => result.dataValues);
      const userId = newUser.id;
      const newRole = await models.Roles.create({ roleName: role }, { transaction: t })
        .then((result) => result.dataValues);
      const roleId = newRole.id;
      await models.UsersRoles.create({ userId, roleId }, { transaction: t })
        .then((result) => result.dataValues);
      newUser.roles = newRole.roleName;
      return newUser;
    });
    return user;
  }

  /**
   * @name GetUserByEmail
   * @description Interacts with model to find a single user
   * @param { string } email the user's email
   * @returns {object} return the user's data
   */
  static async getUserByEmail(email) {
    const data = await models.Users.findOne({
      where: { email },
      include: [{
        model: models.Roles,
        as: 'roles'
      }]
    });
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
    const data = await models.Users.update({ rememberInfo }, { where: { id } });
    if (data[0] === 0) throw new Error('could not update user field');
  }
}
