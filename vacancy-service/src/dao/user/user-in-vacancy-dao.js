const { dbQuery } = require('../../config/index');
const { searchCandidateQuery } = require('../queries/queries');

const checkUserInVacancyDAO = async (vacancyId, userId) => {
  let refactorUserId = `{${userId}}`;

  let values = [vacancyId, refactorUserId];

  try {
    let candidateInVacancy = await dbQuery.query(searchCandidateQuery, values);

    if (candidateInVacancy.rows[0]) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = { checkUserInVacancyDAO };
