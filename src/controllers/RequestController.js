import RequestServices from '../services/requestServices';
import ResponseMsg from '../utils/responseMessages';

const { resSuccess, resError } = ResponseMsg;


/**
 * A collection of methods that controls user requests.
 *
 * @class RequestController
 */
export default class RequestController {
  /**
 *  assign a role to a user
 * @static
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @returns { JSON } - A JSON object containing success or failure details.
 * @memberof RequestController
 */
  static async getUserRequests(req, res) {
    try {
      const { id } = req.user;
      const requests = await RequestServices.getRequests(id);
      if (!requests) {
        return resError(res, 404, 'You have made no request yet');
      }
      return resSuccess(res, 200, requests);
    } catch (error) {
      resError(res, 500, error.message);
    }
  }
}
