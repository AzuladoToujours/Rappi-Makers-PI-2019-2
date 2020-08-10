const axios = require('axios');
require('dotenv').config();

/**
 *Conexion with vacancy service
 * @param {object} req
 * @param {object} res
 * @returns {json} json
 */
async function createVacancyFetch(token, body) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };
  try {
    const vacancyResponse = await axios.post(
      `${process.env.VACANCY_HOST}/api/${process.env.VERSION}/vacancy/newVacancy`,
      body,
      { headers: headers }
    );

    return vacancyResponse;
  } catch (e) {
    return e;
  }
}

module.exports = { createVacancyFetch };
