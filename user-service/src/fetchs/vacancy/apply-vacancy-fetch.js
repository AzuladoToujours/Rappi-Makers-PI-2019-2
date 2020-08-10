const axios = require('axios');
require('dotenv').config();
/**
 *Conection with Vacancy Service
 * @param {object} body
 * @returns {Object} userResponse
 * @returns {Boolean}
 */
async function applyToVacancyFetch(vacancyId, token) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };
  let body;
  try {
    const vacancyResponse = await axios.put(
      `${process.env.VACANCY_HOST}/api/${process.env.VERSION}/vacancy/${vacancyId}/addcandidate`,
      body,
      { headers: headers }
    );

    return vacancyResponse;
  } catch (e) {
    //console.log(e);
    return e;
  }
}

module.exports = { applyToVacancyFetch };
