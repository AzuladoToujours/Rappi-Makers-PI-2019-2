const { updateBalanceQuery } = require('./queries/queries');
const { dbQuery } = require('../config/index');

const updateBalanceDAO = async (id, balance) => {
  try {
    console.log(id);
    console.log(balance);
    await dbQuery.query(updateBalanceQuery, [id, balance]);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { updateBalanceDAO };
