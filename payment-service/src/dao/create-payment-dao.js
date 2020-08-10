const { dbQuery } = require('../config/index');
const { createPaymentQuery } = require('./queries/queries');
const moment = require('moment-timezone');

const createPaymentDAO = async (amount) => {
  const date = moment(new Date()).tz('America/Bogota').format();
  values = [date, amount];

  try {
    let createAndGetId = await dbQuery.query(createPaymentQuery, values);

    return createAndGetId.rows[0].id;
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = { createPaymentDAO };
