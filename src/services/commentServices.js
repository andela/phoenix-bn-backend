import models from '../models';

/**
 * Comment service Class
 */
export default class commentServices {
  /**
   * @name CreateComment
   * @description Interacts with model to create comment
   * @param { string } userData the user's data
   * @returns {object} return the updated field
   */
  static async createComment(userData) {
    const { dataValues } = await models.Comment.create(userData);
    return dataValues;
  }
}
