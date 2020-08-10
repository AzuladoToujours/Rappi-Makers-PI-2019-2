const { dbQuery } = require('../config/index');
const { createRestaurantQuery } = require('./queries/queries');

/**
 * Create a new user
 * @param {Array} values
 */
const createRestaurantDAO = async values => {
  try {
    let createAndGetId = await dbQuery.query(createRestaurantQuery, values);
    return createAndGetId.rows[0];
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = { createRestaurantDAO };
