const { getRestaurantByNitDAO } = require('../dao/get-restaurants-dao');
const PropertyRequiredError = require('../errors/property-required.error');
const NotFoundError = require('../errors/not-found.error');
/**
 *Returns single restaurant from the database
 * @param {object} req
 * @param {object} res
 * @returns {json} json
 */
const getRestaurantByNitService = async (req, res) => {
  if (!req.params.nit) {
    let propertyRequired = new PropertyRequiredError(nit);
    return propertyRequired.errorResponse(res);
  }

  let nit = req.params.nit;
  let restaurant = await getRestaurantByNitDAO(nit);

  if (!restaurant) {
    let notFound = new NotFoundError();

    return notFound.errorResponse(res);
  }

  return res.status(200).json(restaurant);
};

module.exports = { getRestaurantByNitService };
