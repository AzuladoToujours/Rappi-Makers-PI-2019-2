const { getUserByDniDAO } = require('../dao/get-users-dao');
const PropertyRequiredError = require('../errors/property-required.error');
const NotFoundError = require('../errors/not-found.error');
/**
 *Returns single user from the database
 * @param {object} req
 * @param {object} res
 * @returns {json} json
 */
const getUserByDniService = async (req, res) => {
  if (!req.params.dni) {
    let propertyRequired = new PropertyRequiredError(dni);
    return propertyRequired.errorResponse(res);
  }

  let dni = req.params.dni;
  let user = await getUserByDniDAO(dni);

  if (!user) {
    let notFound = new NotFoundError();

    return notFound.errorResponse(res);
  }

  return res.status(200).json(user);
};

module.exports = { getUserByDniService };
