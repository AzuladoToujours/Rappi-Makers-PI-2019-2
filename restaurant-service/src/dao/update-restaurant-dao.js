const { updateRestaurantQuery } = require('./queries/queries');
const { dbQuery } = require('../config/index');

const updateRestaurantDAO = async values => {
  try {
    await dbQuery.query(updateRestaurantQuery, values);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { updateRestaurantDAO };
