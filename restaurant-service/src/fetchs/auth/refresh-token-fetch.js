const axios = require('axios');
require('dotenv').config();

/**
 *Conexion with payment service
 * @param {object} req
 * @param {object} res
 * @returns {json} json
 */
async function refreshTokenFetch(token) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };
  try {
    const authResponse = await axios.get(
      `${process.env.AUTH_HOST}/api/${process.env.VERSION}/auth/restaurant/refreshtoken`,
      { headers: headers }
    );

    return authResponse;
  } catch (e) {
    return false;
  }
}

module.exports = { refreshTokenFetch };
