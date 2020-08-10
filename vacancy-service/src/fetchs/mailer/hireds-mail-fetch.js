const axios = require('axios');
require('dotenv').config();

/**
 *Conection with Notification service
 * @param {Object} body
 * @returns {Object} restaurantResponse
 * @returns {Boolean}
 */
async function notifyHiredsFetch(emails) {
  let link = `${process.env.CLIENT_HOST_LOGIN}`;
  let body = {
    emails: emails,
    link: link,
  };
  try {
    await axios.post(
      `${process.env.NOTIFICATION_HOST}/api/${process.env.VERSION}/mailer/notifyhireds`,
      body
    );
  } catch (e) {
    console.log(e);
  }
}

module.exports = { notifyHiredsFetch };
