const { dbQuery } = require('../../config/index');
const { removeCandidateQuery } = require('../queries/queries');

const removeCandidateDAO = async (vacancyId, userId) => {
  let values = [vacancyId, userId];

  try {
    await dbQuery.query(removeCandidateQuery, values);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = { removeCandidateDAO };
