const { getAccountByEmailDao } = require('../dao/account/get-account-dao');
const { getUserByIdFetch } = require('../fetchs/user/get-user-fetch');
const {
  getRestaurantByIdFetch,
} = require('../fetchs/restaurant/get-restaurant-fetch');
const Helper = require('../utils/jwt.utils');
const WrongCredentialsError = require('../errors/wrong-credentials.error');

/**
 * SignIn the account
 * @param {object} req
 * @param {object} res
 * @returns {json} json
 */

const signInService = async (req, res) => {
  let wrongCredentials = new WrongCredentialsError(res);

  //Check for no credentials
  if (!req.body.email || !req.body.password) {
    return wrongCredentials.errorResponse();
  }

  //Verify account's existence
  let account = await getAccountByEmailDao(req.body.email);

  if (account) {
    //Compare passwords
    if (Helper.comparePassword(account.hashed_password, req.body.password)) {
      //Check if user or restaurant
      let data = account.user_id
        ? await getUserByIdFetch(account.user_id)
        : await getRestaurantByIdFetch(account.restaurant_id);
      //Generarate token
      let token;
      if (data) {
        token = account.user_id
          ? Helper.generateUserToken(data.id)
          : Helper.generateRestaurantToken(data.id, data.balance);
      } else {
        return wrongCredentials.errorResponse();
      }

      //Do response
      if (account.user_id) {
        return res.status(200).json({ token: token, user: data });
      } else {
        return res.status(200).json({ token: token, restaurant: data });
      }
    } else {
      return wrongCredentials.errorResponse();
    }
  } else {
    return wrongCredentials.errorResponse();
  }
};

module.exports = { signInService };
