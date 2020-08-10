const axios = require('axios');
require('dotenv').config();

/**
 *Conection with Notification service
 * @param {Object} body
 * @returns {Boolean}
 * @returns {Boolean}
 */
async function forgotPasswordMailFetch(email, token) {
  let body = {
    email: email,
    token: token,
  };
  try {
    await axios.post(
      `${process.env.NOTIFICATION_HOST}/api/${process.env.VERSION}/mailer/sendforgotpasswordmail`,
      body
    );

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

module.exports = { forgotPasswordMailFetch };
