const { dbQuery } = require('../config/index');
const { getEmailByIdQuery } = require('./queries/queries');

const getEmailByIdDAO = async id => {
  try {
    const response = await dbQuery.query(getEmailByIdQuery, [id]);
    if (response.rows[0]) {
      return response.rows[0].email;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

module.exports = { getEmailByIdDAO };
