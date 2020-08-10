const { dbQuery } = require('../config/index');
const { updateVacancyQuery } = require('./queries/queries');

const updateVacancyDAO = async (values) => {
  try {
    await dbQuery.query(updateVacancyQuery, values);

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = { updateVacancyDAO };
