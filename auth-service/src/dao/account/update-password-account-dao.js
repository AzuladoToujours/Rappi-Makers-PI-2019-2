const { dbQuery } = require('../../config/index');
const { updatePasswordQuery } = require('../queries/queries');

const updatePasswordDAO = async (id, newPassword) => {
  let values = [id, newPassword];

  try {
    await dbQuery.query(updatePasswordQuery, values);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { updatePasswordDAO };
