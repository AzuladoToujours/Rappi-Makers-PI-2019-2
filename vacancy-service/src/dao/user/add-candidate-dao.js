const { dbQuery } = require('../../config/index');
const { addCandidateQuery } = require('../queries/queries');

const addCandidateDAO = async (vacancyId, userId) => {
  let values = [vacancyId, userId];

  try {
    await dbQuery.query(addCandidateQuery, values);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = { addCandidateDAO };
