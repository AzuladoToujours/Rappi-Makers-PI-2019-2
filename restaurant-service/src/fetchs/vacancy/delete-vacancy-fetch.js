const axios = require('axios');
require('dotenv').config();

/**
 *Conexion with vacancy service
 * @param {object} req
 * @param {object} res
 * @returns {json} json
 */
async function deleteVacancyFetch(token, id) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };
  try {
    const vacancyResponse = await axios.delete(
      `${process.env.VACANCY_HOST}/api/${process.env.VERSION}/vacancy/${id}`,
      { headers: headers }
    );

    return vacancyResponse;
  } catch (e) {
    return e;
  }
}

module.exports = { deleteVacancyFetch };
