import commentServices from '../services/commentServices';
import ResponseMsg from '../utils/responseMessages';

const { resSuccess, resError } = ResponseMsg;


/**
 * Comments controller Class
 */
export default class CommentController {
  /**
     * @name postComment
     * @description Allows a user post a comment
     * @param {object} req The request object
     * @param {object} res The response object
     * @returns {object} The API response
     */
  static async postComment(req, res) {
    try {
      const { id: userId } = req.user;
      const { comment } = req.body;
      const { tripId } = req.params;
      const data = await commentServices.createComment({ userId, comment, tripId });
      return resSuccess(res, 201, data);
    } catch (error) {
      return resError(res, 500, error.message);
    }
  }
}
