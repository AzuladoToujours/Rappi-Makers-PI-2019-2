const axios = require('axios');
const Helper = require('../../utils/jwt.utils');
require('dotenv').config();

/**
 *Conection with Restaurant service
 * @param {Object} body
 * @returns {Object} restaurantResponse
 * @returns {Boolean}
 */
async function createRestaurantFetch(body) {
  let token = Helper.generateAPIToken();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  try {
    const restaurantResponse = await axios.post(
      `${process.env.RESTAURANT_HOST}/api/${process.env.VERSION}/restaurant/create`,
      body,
      { headers: headers }
    );
    if (restaurantResponse.status == 200) {
      return restaurantResponse.data.id;
    }
  } catch (e) {
    return false;
  }
}

module.exports = { createRestaurantFetch };
