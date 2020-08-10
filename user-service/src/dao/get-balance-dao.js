const { getBalanceQuery } = require('./queries/queries');
const { dbQuery } = require('../config/index');

const getBalanceDAO = async id => {
  try {
    let balance = await dbQuery.query(getBalanceQuery, [id]);

    return balance.rows[0];
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getBalanceDAO };
