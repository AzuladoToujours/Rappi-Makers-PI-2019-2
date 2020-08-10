const { getRestaurantContractsDAO } = require('../../dao/get-contracts-dao');
const { fixManyDatesAndHours } = require('../fix-dates-hours.service');

const getRestaurantsContractsService = async (req, res) => {
  let restaurantId = req.authRestaurant.restaurantId;
  let contracts = await getRestaurantContractsDAO(restaurantId);

  contracts = fixManyDatesAndHours(contracts);

  return res.status(200).json(contracts);
};

module.exports = { getRestaurantsContractsService };
