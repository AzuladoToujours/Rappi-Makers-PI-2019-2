const axios = require('axios');
require('dotenv').config();

/**
 *Conection with Notification service
 * @param {Object} body
 * @returns {Object} restaurantResponse
 * @returns {Boolean}
 */
async function notifyCandidatesAndHiredsFetch(emails, vacancyId) {
  let link = `${process.env.CLIENT_HOST_VACANCY}/${vacancyId}`;
  let body = {
    emails: emails,
    link: link,
  };
  try {
    await axios.post(
      `${process.env.NOTIFICATION_HOST}/api/${process.env.VERSION}/mailer/notifycandidateshireds`,
      body
    );
  } catch (e) {
    console.log(e);
  }
}

module.exports = { notifyCandidatesAndHiredsFetch };
