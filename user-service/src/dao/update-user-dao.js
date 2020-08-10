const { updateUserQuery } = require('./queries/queries');
const { dbQuery } = require('../config/index');

const updateUserDAO = async values => {
  try {
    await dbQuery.query(updateUserQuery, values);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { updateUserDAO };
