const axios = require('axios');
require('dotenv').config();

/**
 *Conexion with payment service
 * @param {object} req
 * @param {object} res
 * @returns {json} json
 */
async function fetchToPayment(token, body) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };
  try {
    const paymentResponse = await axios.post(
      `${process.env.PAYMENT_HOST}/api/${process.env.VERSION}/payment/registertransaction`,
      body,
      { headers: headers }
    );

    return paymentResponse;
  } catch (e) {
    return e;
  }
}

module.exports = { fetchToPayment };
