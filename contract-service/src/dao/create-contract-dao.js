const { dbQuery } = require('../config/index');
const { createContractQuery } = require('./queries/queries');

const createContractDAO = async (values) => {
  try {
    let createAndGetId = await dbQuery.query(createContractQuery, values);
    return createAndGetId.rows[0].id;
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = { createContractDAO };
