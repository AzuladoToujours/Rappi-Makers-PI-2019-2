const PDFDocument = require('pdfkit');
const moment = require('moment-timezone');
const { fetchToUser } = require('../../fetch/user/get-user-fetch');
const {
  fetchToRestaurant,
} = require('../../fetch/restaurant/get-restaurant-fetch');
moment.locale('es-us');

const generateContract = async (req, res) => {
  let contract = req.params.contract;
  let userId = req.authUser.userId;
  let user = await fetchToUser(userId);
  let restaurantId = contract.restaurant_id;
  let restaurant = await fetchToRestaurant(restaurantId);
  let payment = calculatePayment(contract);
  let doc = createDocument(user, contract, restaurant, payment);
  //   //RESPONSE WITH AWS
  //   // let response = await uploadWageReportToS3(req, res, workerId, doc);
  //   // return res.status(200).json({ response: response.Location });
  //   //EMBEBBED FILE
  doc.pipe(res);
};

const calculatePayment = (contract) => {
  let endDate = moment.tz(contract.end_at, 'America/Bogota').format();
  let startDate = moment.tz(contract.start_at, 'America/Bogota').format();
  let vancancyDuration = moment
    .duration(moment(endDate).diff(moment(startDate)))
    .asHours();
  let payment =
    parseFloat(vancancyDuration) * parseFloat(contract.payment_per_hour);

  return payment;
};

const createDocument = (user, contract, restaurant, payment) => {
  // Create a document
  let doc = new PDFDocument();

  doc.image('rappi.png', 0, 15, { width: 300 });
  doc.moveDown();
  doc.moveDown();
  doc.moveDown();
  let date = moment(new Date()).tz('America/Bogota').format('LL');
  doc.fontSize(15).text(`${contract.city}, ${date}.`, {
    width: 410,
    align: 'left',
  });
  doc.moveDown();
  doc.moveDown();
  doc.moveDown();
  doc.fontSize(15).text('A QUIÉN INTERESE, ', {
    width: 410,
    align: 'center',
  });

  let start_at = moment(contract.start_at).tz('America/Bogota').format('LLLL');
  let end_at = moment(contract.end_at).tz('America/Bogota').format('LLLL');

  let text =
    `Por medio de la presente, hago constar que ${user.names} ${user.last_names}, ` +
    `identificado con cédula número ${user.identity_card}, hizo parte de la vacante identificada con ID ${contract.vacacancy_id}, ` +
    `desde el ${start_at} hasta ${end_at}, ` +
    `percibiendo un ingreso bruto de $${payment} COP.`;
  doc.moveDown();
  doc.moveDown();
  doc.moveDown();
  doc.fontSize(15).text(`${text}`, {
    width: 410,
    align: 'justify',
  });
  doc.moveDown();
  doc.moveDown();
  doc.moveDown();
  let signature = `
    Atentamente,
    ${restaurant.name}
    ${restaurant.email}`;
  doc.fontSize(15).text(`${signature}`, {
    width: 410,
    align: 'left',
  });

  doc.end();
  return doc;
};

module.exports = { generateContract };
