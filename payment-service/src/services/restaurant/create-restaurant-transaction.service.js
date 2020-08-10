const { createPaymentDAO } = require('../../dao/create-payment-dao');
const {
  createRestaurantTransanctionDAO,
} = require('../../dao/restaurant/create-restaurant-transaction-dao');
const PropertyRequiredError = require('../../errors/property-required.error');
const DatabaseError = require('../../errors/database.error');

const createRestaurantTransanctionService = async (req, res) => {
  if (!req.body.amount || req.body.amount == 0) {
    let propertyRequired = new PropertyRequiredError('amount');

    return propertyRequired.errorResponse(res);
  }

  const { amount } = req.body;

  let createAndGetId = await createPaymentDAO(amount);
  if (createAndGetId) {
    let restaurantId = req.authRestaurant.restaurantId;
    let success = await createRestaurantTransanctionDAO(
      restaurantId,
      createAndGetId
    );
    if (success == true) {
      return res.status(200).json({ success: true });
    } else {
      let database = new DatabaseError();

      return database.errorResponse(res);
    }
  } else {
    let database = new DatabaseError();

    return database.errorResponse(res);
  }
};

module.exports = { createRestaurantTransanctionService };
