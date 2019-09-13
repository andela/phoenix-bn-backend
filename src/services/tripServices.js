import models from '../models';

/**
 * Trips service Class
 */
export default class TripServices {
  /**
   * @name CreateTrip
   * @description Interacts with model to create a new one way trip
   * @param { string } userData the user's data
   * @returns {object} return the updated field
   */
  static async createTrip(userData) {
    const { dataValues } = await models.Trip.create(userData);
    return dataValues;
  }

    /**
   * @name RejectTripRequest
   * @description Allows a manager reject a trip request
   * @param { number } id the trip's id
   * @returns {object} return the updated field
   */
  static async rejectTripRequest(id) {
    const data = await models.Trip.update({ status: 'rejected' }, { where: { id }, returning: true});
    return data[1][0].dataValues;
  }

  /**
   * @name getTripById
   * @description Interacts with model to find a single trip
   * @param { string } id the trip's id
   * @returns {object} return the trip's data
   */
  static async getTripById(id) {
    const data = await models.User.findOne({ where: { id } });
    return data;
  }
}
