const { dbQuery } = require('../../config/index');
const { getCandidatesQuery } = require('../queries/queries');

const getCandidatesDAO = async (id) => {
  try {
    const response = await dbQuery.query(getCandidatesQuery, [id]);
    console.log(response.rows[0]);
    return response.rows[0].candidates;
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getCandidatesDAO };
