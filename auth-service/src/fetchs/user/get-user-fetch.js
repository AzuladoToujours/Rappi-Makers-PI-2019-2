const axios = require('axios');
const Helper = require('../../utils/jwt.utils');
require('dotenv').config();

/**
 *Conection with Users service
 * @param {String} dni
 * @returns {Boolean}
 */
async function getUserByDniFetch(dni) {
  let token = Helper.generateAPIToken();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  try {
    const userResponse = await axios.get(
      `${process.env.USER_HOST}/api/${process.env.VERSION}/user/dni/${dni}`,
      { headers: headers }
    );
    if (userResponse.status == 200) {
      return true;
    }
  } catch (e) {
    return false;
  }
}

/**
 *Conection with Users service
 * @param {String} userId
 * @returns {Object} userResponse
 * @returns {Boolean}
 */
async function getUserByIdFetch(userId) {
  let token = Helper.generateAPIToken();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  try {
    const userResponse = await axios.get(
      `${process.env.USER_HOST}/api/${process.env.VERSION}/user/auth/${userId}`,
      { headers: headers }
    );
    if (userResponse.status == 200) {
      return userResponse.data;
    }
  } catch (e) {
    return false;
  }
}

module.exports = { getUserByDniFetch, getUserByIdFetch };
