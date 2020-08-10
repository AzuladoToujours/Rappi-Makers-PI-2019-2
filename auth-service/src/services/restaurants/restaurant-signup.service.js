const {
  getAccountByEmailDao,
  getAccountById,
} = require('../../dao/account/get-account-dao');
const {
  getRestaurantByNitFetch,
} = require('../../fetchs/restaurant/get-restaurant-fetch');
const { getUserByDniFetch } = require('../../fetchs/user/get-user-fetch');
const {
  createRestaurantFetch,
} = require('../../fetchs/restaurant/create-restaurant-fetch');
const {
  createRestaurantAccountDao,
} = require('../../dao/account/create-account-dao');
const { signUpMailFetch } = require('../../fetchs/mailer/sign-up-mail-fetch');

/**
 * SignUp a new restaurant
 * @param {object} req
 * @param {object} res
 * @returns {json} json
 */

const restaurantSignUpService = async (req, res) => {
  //Checks existence of restaurant
  let account = await getAccountByEmailDao(req.body.email);
  let accountById = await getAccountById(req.body.nit);

  console.log(accountById);

  if (account == false && accountById == false) {
    let password = req.body.password;
    let body = req.body;
    body.password = undefined;
    //Create restaurant and get the id
    let restaurantId = await createRestaurantFetch(body);
    if (!restaurantId) {
      return res.status(400).json({ error: 'Error al crear restaurante' });
    }
    const { email, nit } = req.body;
    //Create account
    await createRestaurantAccountDao(nit, email, restaurantId, password);
    signUpMailFetch(email);
    return res.status(200).json({ message: 'Restaurante creado con éxito!' });
  } else {
    return res.status(400).json({ error: 'La cuenta ya existe.' });
  }
};

module.exports = { restaurantSignUpService };
