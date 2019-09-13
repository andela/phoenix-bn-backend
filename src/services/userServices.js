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
    const user = await models.sequelize.transaction(async (t) => {
      const m = await models.Users.create(userData, { transaction: t });
      return m;
    }).then(async (result) => {
      const { dataValues } = result;
      const roleData = {
        userId: dataValues.id,
        userEmail: dataValues.email,
        roleName: userData.role
      };
      const role = await models.Roles.create(roleData);
      delete dataValues.password;
      dataValues.Roles = role.dataValues;
      return dataValues;
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
      include: [
        { model: models.Roles, where: { userEmail: email } }
      ]
    });
    return data;
  }
}
