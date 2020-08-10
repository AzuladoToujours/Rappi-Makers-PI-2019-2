const { getEmailByIdDAO } = require('../dao/get-email-dao');
const PropertyRequiredError = require('../errors/property-required.error');
const NotFoundError = require('../errors/not-found.error');
/**
 *Returns single user from the database
 * @param {object} req
 * @param {object} res
 * @returns {json} json
 */
const getEmailByIdService = async (req, res) => {
  if (!req.params.id) {
    let propertyRequired = new PropertyRequiredError(id);
    return propertyRequired.errorResponse(res);
  }

  let id = req.params.id;
  let email = await getEmailByIdDAO(id);

  if (!email) {
    let notFound = new NotFoundError();

    return notFound.errorResponse(res);
  }

  return res.status(200).json({ email: email });
};

module.exports = { getEmailByIdService };
