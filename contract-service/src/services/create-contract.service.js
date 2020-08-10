const { createContractDAO } = require('../dao/create-contract-dao');
const { scheduleClosureService } = require('./schedule-closure.service');
const moment = require('moment-timezone');

const createContractService = async (req, res) => {
  const created_at = moment(new Date()).tz('America/Bogota').format();
  const values = Object.values(req.body);
  values.push(created_at);

  let createAndGetId = await createContractDAO(values);

  if (createAndGetId) {
    scheduleClosureService(req, createAndGetId);
    return res.status(200).send();
  } else {
    return res.status(400).send();
  }
};

module.exports = { createContractService };
