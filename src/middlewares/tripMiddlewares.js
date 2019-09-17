import TripServices from '../services/tripServices';
import ResponseMsg from '../utils/responseMessages';

const { resError } = ResponseMsg;

/**
 * Trip Middlewares Class
 */
export default class TripMiddlewares {
/**
 * @name checkTripExists
 * @description Checks if a trip exists based on the id
 * @param {object} req The request object
 * @param {object} res The response object
 * @param {object} next The response object
 * @returns {object} The API response or next()
 */
  static async checkTripExists(req, res, next) {
    try {
      const { id } = req.params;
      const data = await TripServices.getTripById(id);
      if (data) return next();
      return resError(res, 404, 'Unsuccesful, no trip found for the provided id.');
    } catch (error) {
      return resError(res, 500, error.message);
    }
  }
}
