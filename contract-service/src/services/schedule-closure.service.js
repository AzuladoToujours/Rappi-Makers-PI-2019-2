const moment = require('moment-timezone');
const schedule = require('node-schedule');
const { fetchPaymentToUser } = require('../fetch/payment/payment-user-fetch');
const {
  updateContractStatusDAO,
} = require('../dao/update-contract-status-dao');

const scheduleClosureService = async (req, contractId) => {
  let contractValues = req.body;
  let endDate = moment.tz(contractValues.end_at, 'America/Bogota').format();
  console.log(endDate);
  console.log(contractId);
  var j = schedule.scheduleJob(endDate, async function () {
    await payEachWorker(contractValues, contractId);
    await updateContractStatusDAO(contractId);
  });
};

const payEachWorker = async (contractValues, contractId) => {
  let endDate = moment.tz(contractValues.end_at, 'America/Bogota').format();
  let startDate = moment.tz(contractValues.start_at, 'America/Bogota').format();
  let vancancyDuration = moment
    .duration(moment(endDate).diff(moment(startDate)))
    .asHours();

  var eraseBrackets = contractValues.workers.substring(
    1,
    contractValues.workers.length - 1
  );

  console.log(eraseBrackets);

  var workers = eraseBrackets.split(',');

  console.log(workers);

  console.log('Comienza en: ', startDate);
  console.log('Termina en: ', endDate);
  console.log('Cantidad de horas a trabajar', vancancyDuration);
  console.log('Cantidad de trabajadores: ', workers.length);
  console.log('Pago por hora: ', contractValues.payment_per_hour);

  let payment =
    parseFloat(vancancyDuration) * parseFloat(contractValues.payment_per_hour);

  console.log('El pago para cada trabajador es: ', parseFloat(payment));

  const fetch = workers.map((worker) => {
    fetchPaymentToUser(contractId, worker, parseFloat(payment));
  });

  Promise.all(fetch).then(() => {
    console.log('Pagos completos');
  });
};

module.exports = { scheduleClosureService };
