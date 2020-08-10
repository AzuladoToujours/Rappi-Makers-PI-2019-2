const { getRestaurantsDAO } = require('../dao/get-restaurants-dao');

/**
 *Returns all the restaurants from the database
 * @param {object} req
 * @param {object} res
 * @returns {json} json
 */
const getRestaurantsService = async (req, res) => {
  let restaurants = await getRestaurantsDAO();

  return res.status(200).json(restaurants);
};

module.exports = { getRestaurantsService };
