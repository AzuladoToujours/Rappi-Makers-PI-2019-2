const { dbQuery } = require('../config/index');
const { createUserQuery } = require('./queries/queries');

/**
 * Create a new user
 * @param {Array} values
 */
const createUserDAO = async values => {
  try {
    let createAndGetId = await dbQuery.query(createUserQuery, values);
    return createAndGetId.rows[0];
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = { createUserDAO };
