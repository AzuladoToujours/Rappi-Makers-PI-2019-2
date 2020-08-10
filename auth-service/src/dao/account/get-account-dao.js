const { dbQuery } = require('../../config/index');
const {
  getAccountByEmailQuery,
  getAccountByIdQuery,
  getAccountByTokenQuery,
} = require('../queries/queries');

/**
 * Gets the account by email
 * @param {String} email
 * @returns {Object} account
 * @returns {Boolean}
 */
const getAccountByEmailDao = async (email) => {
  try {
    let account = await dbQuery.query(getAccountByEmailQuery, [email]);

    if (!account.rows[0]) {
      return false;
    } else {
      return account.rows[0];
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};

const getAccountById = async (id) => {
  try {
    let account = await dbQuery.query(getAccountByIdQuery, [id]);

    if (!account.rows[0]) {
      return false;
    } else {
      return account.rows[0];
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};

const getAccountByTokenDAO = async (token) => {
  try {
    let account = await dbQuery.query(getAccountByTokenQuery, [token]);

    if (!account.rows[0]) {
      return false;
    } else {
      return account.rows[0];
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = { getAccountByEmailDao, getAccountById, getAccountByTokenDAO };
