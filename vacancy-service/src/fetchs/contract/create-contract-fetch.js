const axios = require('axios');
require('dotenv').config();
const { getVacancyByIdDAO } = require('../../dao/get-vacancies-dao');

/**
 *Conexion with contract service
 * @param {object} req
 * @param {object} res
 * @returns {json} json
 */
async function createContractFetch(vacancyId, hiredId) {
  let body = await contractValues(vacancyId, hiredId);
  try {
    await axios.post(
      `${process.env.CONTRACT_HOST}/api/${process.env.VERSION}/contract/createcontract`,
      body
    );
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

const contractValues = async (vacancyId, hiredId) => {
  let vacancy = await getVacancyByIdDAO(vacancyId);

  let workers = [...vacancy.hireds, hiredId];

  workers = workers.toString();

  const body = {
    vacancyId: vacancy.id,
    restaurantId: vacancy.restaurant_id,
    description: vacancy.description,
    start_at: vacancy.start_at,
    end_at: vacancy.end_at,
    payment_per_hour: vacancy.payment_per_hour,
    country: vacancy.country,
    state: vacancy.state,
    city: vacancy.city,
    address: vacancy.address,
    workers: `{${workers}}`,
    position_id: vacancy.position_id,
  };

  return body;
};

module.exports = { createContractFetch };
