const { dbQuery } = require('../config/index');
const { createVacancyQuery } = require('./queries/queries');

/**
 * Create a vacancy
 * @param {Array} values
 */
const createVacancyDAO = async (values) => {
  try {
    await dbQuery.query(createVacancyQuery, values);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = { createVacancyDAO };
