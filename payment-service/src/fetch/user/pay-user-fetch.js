const axios = require('axios');
require('dotenv').config();

const payToUserFetch = async (userId, amount) => {
  let body = {
    amount: amount,
  };
  try {
    await axios.put(
      `${process.env.USER_HOST}/api/${process.env.VERSION}/user/pay/${userId}`,
      body
    );
  } catch (e) {
    console.log(e);
  }
};

module.exports = { payToUserFetch };
