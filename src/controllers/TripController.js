import TripServices from '../services/tripServices';
import ResponseMsg from '../utils/responseMessages';

const { resSuccess, resError } = ResponseMsg;

/**
 * User controller Class
 */
export default class TripController {
  /**
     * @name OneWayTrip
     * @description Allows a user make a one way trip
     * @param {object} req The request object
     * @param {object} res The response object
     * @returns {object} The API response
     */
  static async oneWayTrip(req, res) {
    try {
      const { id: userId } = req.user;
      const inputData = { ...req.body };
      const data = await TripServices.createTrip({ userId, ...inputData });
      return resSuccess(res, 201, data);
    } catch (error) {
      return resError(res, 500, error.message);
    }
  }

  /**
     * @name multiCityTrip
     * @description Allows a user make a multi City trip
     * @param {object} req The request object
     * @param {object} res The response object
     * @returns {object} The API response
     */
  static async multiCityTrip(req, res) {
    try {
      const { id: userId } = req.user;
      const inputData = { ...req.body };
      const data = await TripServices.createMultiCityTrip({ userId, ...inputData });
      return resSuccess(res, 201, data);
    } catch (error) {
      return resError(res, 500, error.message);
    }
  }
}
