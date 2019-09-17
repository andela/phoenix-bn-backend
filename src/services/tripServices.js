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
   * @name CreateMultiCityTrip
   * @description Interacts with model to create a new one way trip
   * @param { string } userData the user's data
   * @returns {object} return the updated field
   */
  static async createMultiCityTrip(userData) {
    const { dataValues } = await models.Trip.create(userData);
    return dataValues;
  }
}
