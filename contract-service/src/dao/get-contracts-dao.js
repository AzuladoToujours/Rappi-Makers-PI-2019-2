const { dbQuery } = require('../config/index');
const {
  getRestaurantContractsQuery,
  getContractQuery,
  getUserContractsQuery,
  getContractByWorkerQuery,
} = require('./queries/queries');

const getRestaurantContractsDAO = async (id) => {
  try {
    let contracts = await dbQuery.query(getRestaurantContractsQuery, [id]);

    return contracts.rows;
  } catch (e) {
    console.log(e);
  }
};

const getUserContractsDAO = async (id) => {
  try {
    let refactorUserId = `{${id}}`;
    let contracts = await dbQuery.query(getUserContractsQuery, [
      refactorUserId,
    ]);

    return contracts.rows;
  } catch (e) {
    console.log(e);
  }
};

const getContractByIdDAO = async (id) => {
  try {
    let contract = await dbQuery.query(getContractQuery, [id]);

    return contract.rows[0];
  } catch (e) {
    console.log(e);
  }
};

const getContractByIdUserDAO = async (contractId, userId) => {
  let refactorUserId = `{${userId}}`;

  let values = [contractId, refactorUserId];

  try {
    let contract = await dbQuery.query(getContractByWorkerQuery, values);

    if (contract.rows[0]) {
      return contract.rows[0];
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = {
  getRestaurantContractsDAO,
  getContractByIdDAO,
  getUserContractsDAO,
  getContractByIdUserDAO,
};
