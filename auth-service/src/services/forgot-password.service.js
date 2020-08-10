const { getAccountByEmailDao } = require('../dao/account/get-account-dao');
const PropertyRequiredError = require('../errors/property-required.error');
const NotFoundError = require('../errors/not-found.error');
const {
  forgotPasswordMailFetch,
} = require('../fetchs/mailer/forgot-password-mail-fetch');
const Helper = require('../utils/jwt.utils');
const { forgotPasswordDAO } = require('../dao/account/forgot-password-dao');

const forgotPasswordService = async (req, res) => {
  if (!req.body.email) {
    let propertyRequired = new PropertyRequiredError('email');
    return propertyRequired.errorResponse(res);
  }
  let { email } = req.body;
  try {
    let account = await getAccountByEmailDao(email);
    if (!account) {
      let notFound = new NotFoundError();
      return notFound.errorResponse(res);
    }

    let token = Helper.generatePasswordResetToken(account.hashed_password);

    let mailResponse = await forgotPasswordMailFetch(email, token);

    if (!mailResponse) {
      return res
        .status(400)
        .json({ error: 'Oops, algo ha pasado, intenta nuevamente más tarde!' });
    }

    await forgotPasswordDAO(account, token);

    return res
      .status(200)
      .json({ message: `Se ha dirigido un mensaje al correo ${email}` });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { forgotPasswordService };
