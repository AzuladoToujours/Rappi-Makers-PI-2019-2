const { dbQuery } = require('../../config/index');
const { createRestaurantTransactionQuery } = require('../queries/queries');

const createRestaurantTransanctionDAO = async (restaurantId, paymentId) => {
  try {
    await dbQuery.query(createRestaurantTransactionQuery, [
      restaurantId,
      paymentId,
    ]);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = { createRestaurantTransanctionDAO };
