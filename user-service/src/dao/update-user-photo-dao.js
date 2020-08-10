const { updateUserPhotoQuery } = require('./queries/queries');
const { dbQuery } = require('../config/index');
const moment = require('moment-timezone');

const updateUserPhotoDAO = async (id, photo) => {
  try {
    let updated_at = moment(new Date())
      .tz('America/Bogota')
      .format();
    let values = [id, photo, updated_at];
    await dbQuery.query(updateUserPhotoQuery, values);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { updateUserPhotoDAO };
