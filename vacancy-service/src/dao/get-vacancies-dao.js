const { dbQuery } = require('../config/index');
const { getAllVacanciesQuery, getVacancyQuery } = require('./queries/queries');

const getVacanciesDAO = async () => {
  try {
    const response = await dbQuery.query(getAllVacanciesQuery);
    return response.rows;
  } catch (e) {
    console.log(e);
  }
};

const getVacancyByIdDAO = async (id) => {
  try {
    const response = await dbQuery.query(getVacancyQuery, [id]);
    if (response.rows[0]) {
      return response.rows[0];
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

module.exports = {
  getVacanciesDAO,
  getVacancyByIdDAO,
};
