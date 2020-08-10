const { dbQuery } = require('../../config/index');
const { passwordResetsQuery } = require('../queries/queries');
const moment = require('moment-timezone');

const forgotPasswordDAO = async (account, token) => {
  let created_at = moment(new Date()).tz('America/Bogota').format();
  let values = [account.email, token, created_at, account.id];

  try {
    await dbQuery.query(passwordResetsQuery, values);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { forgotPasswordDAO };
