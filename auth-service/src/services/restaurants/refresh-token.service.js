const {
  getRestaurantByIdFetch,
} = require('../../fetchs/restaurant/get-restaurant-fetch');
const Helper = require('../../utils/jwt.utils');

const refreshTokenService = async (req, res) => {
  let restaurantId = req.auth.restaurantId;

  let data = await getRestaurantByIdFetch(restaurantId);

  let token = Helper.generateRestaurantToken(restaurantId, data.balance);

  return res.status(200).json({ token: token, balance: data.balance });
};

module.exports = { refreshTokenService };
