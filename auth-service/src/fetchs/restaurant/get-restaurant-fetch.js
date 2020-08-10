const axios = require('axios');
const Helper = require('../../utils/jwt.utils');
require('dotenv').config();

/**
 *Conection with Restaurant service
 * @param {String} nit
 * @returns {Boolean}
 */
async function getRestaurantByNitFetch(nit) {
  let token = Helper.generateAPIToken();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  try {
    const restaurantResponse = await axios.get(
      `${process.env.RESTAURANT_HOST}/api/${process.env.VERSION}/restaurant/nit/${nit}`,
      { headers: headers }
    );
    if (restaurantResponse.status == 200) {
      return true;
    }
  } catch (e) {
    return false;
  }
}
/**
 *Conection with Restaurant service
 * @param {String} restaurantId
 * @returns {Object} restaurantResponse
 * @returns {Boolean}
 */
async function getRestaurantByIdFetch(restaurantId) {
  let token = Helper.generateAPIToken();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  try {
    const restaurantResponse = await axios.get(
      `${process.env.RESTAURANT_HOST}/api/${process.env.VERSION}/restaurant/auth/${restaurantId}`,
      { headers: headers }
    );
    if (restaurantResponse.status == 200) {
      return restaurantResponse.data;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
}

module.exports = { getRestaurantByNitFetch, getRestaurantByIdFetch };
