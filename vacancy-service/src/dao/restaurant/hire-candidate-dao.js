const { hireCandidateQuery } = require('../queries/queries');
const { dbQuery } = require('../../config/index');

const hireCandidateDAO = async (vacancyId, hiredId) => {
  let values = [vacancyId, hiredId];

  try {
    await dbQuery.query(hireCandidateQuery, values);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { hireCandidateDAO };
