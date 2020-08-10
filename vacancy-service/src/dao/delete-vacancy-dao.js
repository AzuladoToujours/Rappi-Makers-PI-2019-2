const { deleteVacancyQuery } = require('./queries/queries');
const { dbQuery } = require('../config/index');

const deleteVacancyDAO = async (vacancyId) => {
  try {
    await dbQuery.query(deleteVacancyQuery, [vacancyId]);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = { deleteVacancyDAO };
