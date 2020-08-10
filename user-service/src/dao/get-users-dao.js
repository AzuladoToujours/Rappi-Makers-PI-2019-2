const { dbQuery } = require('../config/index');
const {
  getUsersQuery,
  getUserByIdQuery,
  getUserByDniQuery,
  getUserFromAuthQuery
} = require('./queries/queries');

const getUsersDAO = async () => {
  try {
    const response = await dbQuery.query(getUsersQuery);
    return response.rows;
  } catch (e) {
    console.log(e);
  }
};

const getUserByIdDAO = async id => {
  try {
    const response = await dbQuery.query(getUserByIdQuery, [id]);
    if (response.rows[0]) {
      return response.rows[0];
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

const getUserByDniDAO = async dni => {
  try {
    const response = await dbQuery.query(getUserByDniQuery, [dni]);
    if (response.rows[0]) {
      return response.rows[0];
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

const getUserFromAuthDAO = async id => {
  try {
    const response = await dbQuery.query(getUserFromAuthQuery, [id]);
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
  getUsersDAO,
  getUserByIdDAO,
  getUserByDniDAO,
  getUserFromAuthDAO
};
