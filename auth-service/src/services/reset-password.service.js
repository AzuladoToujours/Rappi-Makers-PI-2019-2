const { getAccountByTokenDAO } = require('../dao/account/get-account-dao');
const {
  updatePasswordDAO,
} = require('../dao/account/update-password-account-dao');
const PropertyRequiredError = require('../errors/property-required.error');
const NotFoundError = require('../errors/not-found.error');
const Helper = require('../utils/jwt.utils');

const resetPasswordService = async (req, res) => {
  if (!req.params.token) {
    let propertyRequired = new PropertyRequiredError('token');
    return propertyRequired.errorResponse(res);
  }

  let token = req.params.token;

  let payload = Helper.decodePasswordToken(token);

  if (!payload) {
    let notFound = new NotFoundError();
    return notFound.errorResponse(res);
  }

  let account = await getAccountByTokenDAO(token);

  if (payload.hashed_password == account.hashed_password) {
    let newPassword = Helper.hashPassword(req.body.password);
    await updatePasswordDAO(account.id, newPassword);

    return res
      .status(200)
      .json({ message: 'contraseña cambiada correctamente' });
  } else {
    let notFound = new NotFoundError();
    return notFound.errorResponse(res);
  }
};

module.exports = { resetPasswordService };
