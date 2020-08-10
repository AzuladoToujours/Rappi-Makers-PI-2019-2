const { changeContractStatus } = require('./queries/queries');
const { dbQuery } = require('../config/index');

const updateContractStatusDAO = async (id) => {
  try {
    await dbQuery.query(changeContractStatus, [id]);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { updateContractStatusDAO };
