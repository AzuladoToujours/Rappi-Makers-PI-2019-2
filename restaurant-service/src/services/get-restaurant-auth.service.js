const { getRestaurantFromAuthDAO } = require('../dao/get-restaurants-dao');
const PropertyRequiredError = require('../errors/property-required.error');
const NotFoundError = require('../errors/not-found.error');
/**
 *Returns single restaurant from the database
 * @param {object} req
 * @param {object} res
 * @returns {json} json
 */
const getRestaurantFromAuthService = async (req, res) => {
  if (!req.params.id) {
    let propertyRequired = new PropertyRequiredError(id);
    return propertyRequired.errorResponse(res);
  }

  let id = req.params.id;
  let restaurant = await getRestaurantFromAuthDAO(id);

  if (!restaurant) {
    let notFound = new NotFoundError();

    return notFound.errorResponse(res);
  }

  return res.status(200).json(restaurant);
};

module.exports = { getRestaurantFromAuthService };
