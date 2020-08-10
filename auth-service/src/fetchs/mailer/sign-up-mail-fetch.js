const axios = require('axios');
require('dotenv').config();

/**
 *Conection with Notification service
 * @param {Object} body
 * @returns {Object} restaurantResponse
 * @returns {Boolean}
 */
async function signUpMailFetch(email) {
  let body = {
    email: email,
  };
  try {
    await axios.post(
      `${process.env.NOTIFICATION_HOST}/api/${process.env.VERSION}/mailer/sendsignupmail`,
      body
    );
  } catch (e) {
    console.log(e);
  }
}

module.exports = { signUpMailFetch };
