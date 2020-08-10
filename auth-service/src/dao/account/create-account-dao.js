const { dbQuery } = require('../../config/index');
const {
  createUserAccountQuery,
  createRestaurantAccountQuery,
} = require('../queries/queries');
const Helper = require('../../utils/jwt.utils');

/**
 * Create a new user account
 * @param {String} email
 * @param {String} userId
 * @param {String} password
 */

const createUserAccountDao = async (id, email, userId, password) => {
  let hashedPassword = Helper.hashPassword(password);

  values = [id, email, userId, hashedPassword];

  try {
    await dbQuery.query(createUserAccountQuery, values);
  } catch (e) {
    console.log(e);
  }
};

/**
 * Create a new user account
 * @param {String} email
 * @param {String} restaurantId
 * @param {String} password
 */
const createRestaurantAccountDao = async (
  id,
  email,
  restaurantId,
  password
) => {
  let hashedPassword = Helper.hashPassword(password);

  values = [id, email, restaurantId, hashedPassword];

  try {
    await dbQuery.query(createRestaurantAccountQuery, values);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { createUserAccountDao, createRestaurantAccountDao };
