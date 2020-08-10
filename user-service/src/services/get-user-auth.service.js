const { getUserFromAuthDAO } = require('../dao/get-users-dao');
const PropertyRequiredError = require('../errors/property-required.error');
const NotFoundError = require('../errors/not-found.error');
/**
 *Returns single user from the database
 * @param {object} req
 * @param {object} res
 * @returns {json} json
 */
const getUserFromAuthService = async (req, res) => {
  if (!req.params.id) {
    let propertyRequired = new PropertyRequiredError(id);
    return propertyRequired.errorResponse(res);
  }

  let id = req.params.id;
  let user = await getUserFromAuthDAO(id);

  if (!user) {
    let notFound = new NotFoundError();

    return notFound.errorResponse(res);
  }

  return res.status(200).json(user);
};

module.exports = { getUserFromAuthService };
