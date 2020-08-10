const { changeVacancyStatus } = require('./queries/queries');
const { dbQuery } = require('../config/index');

const updateVacancyStatusDAO = async (id) => {
  try {
    await dbQuery.query(changeVacancyStatus, [id]);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { updateVacancyStatusDAO };
