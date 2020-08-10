const axios = require('axios');
require('dotenv').config();

const fetchPaymentToUser = async (contractId, userId, amount) => {
  let body = {
    contractId: contractId,
    userId: userId,
    amount: amount,
  };
  try {
    await axios.post(
      `${process.env.PAYMENT_HOST}/api/${process.env.VERSION}/payment/paytouser`,
      body
    );
  } catch (e) {
    console.log(e);
  }
};

module.exports = { fetchPaymentToUser };
