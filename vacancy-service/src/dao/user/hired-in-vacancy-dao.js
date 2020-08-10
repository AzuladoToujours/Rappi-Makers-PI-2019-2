const { dbQuery } = require('../../config/index');
const { searchHiredQuery } = require('../queries/queries');

const checkHiredInVacancyDAO = async (vacancyId, userId) => {
  let refactorUserId = `{${userId}}`;

  let values = [vacancyId, refactorUserId];

  try {
    let hiredInVacancy = await dbQuery.query(searchHiredQuery, values);

    if (hiredInVacancy.rows[0]) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = { checkHiredInVacancyDAO };
