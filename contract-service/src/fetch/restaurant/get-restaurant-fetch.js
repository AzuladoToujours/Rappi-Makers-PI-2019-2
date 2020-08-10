const axios = require('axios');
require('dotenv').config();

const fetchToRestaurant = async (restaurantId) => {
  try {
    let response = await axios.get(
      `${process.env.RESTAURANT_HOST}/${restaurantId}`
    );

    return response.data;
  } catch (e) {
    console.log(e);
  }
};

module.exports = { fetchToRestaurant };
