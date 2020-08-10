const { dbQuery } = require('../config/index');
const {
  getRestaurantsQuery,
  getRestaurantByIdQuery,
  getRestaurantByNitQuery,
  getRestaurantFromAuthQuery
} = require('./queries/queries');

const getRestaurantsDAO = async () => {
  try {
    const response = await dbQuery.query(getRestaurantsQuery);
    return response.rows;
  } catch (e) {
    console.log(e);
  }
};

const getRestaurantByIdDAO = async id => {
  try {
    const response = await dbQuery.query(getRestaurantByIdQuery, [id]);
    if (response.rows[0]) {
      return response.rows[0];
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

const getRestaurantByNitDAO = async nit => {
  try {
    const response = await dbQuery.query(getRestaurantByNitQuery, [nit]);
    if (response.rows[0]) {
      return response.rows[0];
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

const getRestaurantFromAuthDAO = async id => {
  try {
    const response = await dbQuery.query(getRestaurantFromAuthQuery, [id]);
    if (response.rows[0]) {
      return response.rows[0];
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

module.exports = {
  getRestaurantsDAO,
  getRestaurantByIdDAO,
  getRestaurantByNitDAO,
  getRestaurantFromAuthDAO
};
