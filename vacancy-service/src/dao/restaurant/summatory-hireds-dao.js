const { summatoryHiredQuery } = require('../queries/queries');
const { dbQuery } = require('../../config/index');

const summatoryOfHiredsDAO = async (vacancyId) => {
  let hiredsSummatory = await dbQuery.query(summatoryHiredQuery, [vacancyId]);

  if (hiredsSummatory.rows[0].array_length == null) {
    hiredsSummatory = 0;
  } else {
    hiredsSummatory = hiredsSummatory.rows[0].array_length;
  }

  return hiredsSummatory;
};

module.exports = { summatoryOfHiredsDAO };
