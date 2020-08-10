const moment = require('moment-timezone');

const fixOneDatesAndHours = (contract) => {
  contract.start_at = moment.tz(contract.start_at, 'America/Bogota').format();
  contract.end_at = moment.tz(contract.end_at, 'America/Bogota').format();
  contract.created_at = moment
    .tz(contract.created_at, 'America/Bogota')
    .format();

  return contract;
};

const fixManyDatesAndHours = (contracts) => {
  contracts.map((contract) => {
    contract.start_at = moment.tz(contract.start_at, 'America/Bogota').format();
    contract.end_at = moment.tz(contract.end_at, 'America/Bogota').format();
    contract.created_at = moment
      .tz(contract.created_at, 'America/Bogota')
      .format();
  });

  return contracts;
};

module.exports = { fixOneDatesAndHours, fixManyDatesAndHours };
