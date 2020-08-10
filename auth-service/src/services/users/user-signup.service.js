const {
  getAccountByEmailDao,
  getAccountById,
} = require('../../dao/account/get-account-dao');
const { getUserByDniFetch } = require('../../fetchs/user/get-user-fetch');
const {
  getRestaurantByNitFetch,
} = require('../../fetchs/restaurant/get-restaurant-fetch');
const { createUserFetch } = require('../../fetchs/user/create-user-fetch');
const {
  createUserAccountDao,
} = require('../../dao/account/create-account-dao');
const { signUpMailFetch } = require('../../fetchs/mailer/sign-up-mail-fetch');

/**
 * SignUp a new user
 * @param {object} req
 * @param {object} res
 * @returns {json} json
 */

const userSignUpService = async (req, res) => {
  //Check existence of email or dni
  let account = await getAccountByEmailDao(req.body.email);
  let accountById = await getAccountById(req.body.identity_card);

  console.log(accountById);

  if (account == false && accountById == false) {
    let password = req.body.password;
    let body = req.body;
    body.password = undefined;
    //Create the user and gets the id
    let userId = await createUserFetch(body);
    if (!userId) {
      return res.status(400).json({ error: 'Error al crear usuario' });
    }
    const { email, identity_card } = req.body;
    //Create account
    await createUserAccountDao(identity_card, email, userId, password);
    signUpMailFetch(email);
    return res.status(200).json({ message: 'Usuario creado con éxito!' });
  } else {
    return res.status(400).json({ error: 'La cuenta ya existe.' });
  }
};

module.exports = { userSignUpService };
