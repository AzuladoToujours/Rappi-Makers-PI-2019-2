const { dbQuery } = require('../../config/index');
const { getHiredsQuery } = require('../queries/queries');

const getHiredsDAO = async (id) => {
  try {
    const response = await dbQuery.query(getHiredsQuery, [id]);
    return response.rows[0].hireds;
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getHiredsDAO };
