const axios = require('axios');
const Helper = require('../../utils/jwt.utils');
require('dotenv').config();
/**
 *Conection with Users service
 * @param {object} body
 * @returns {Object} userResponse
 * @returns {Boolean}
 */
async function createUserFetch(body) {
  let token = Helper.generateAPIToken();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  try {
    const userResponse = await axios.post(
      `${process.env.USER_HOST}/api/${process.env.VERSION}/user/create`,
      body,
      { headers: headers }
    );
    if (userResponse.status == 200) {
      return userResponse.data.id;
    }
  } catch (e) {
    return false;
  }
}

module.exports = { createUserFetch };
