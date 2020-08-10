const axios = require('axios');
require('dotenv').config();

const fetchToUser = async (userId) => {
  try {
    let response = await axios.get(`${process.env.USER_HOST}/${userId}`);

    return response.data;
  } catch (e) {
    console.log(e);
  }
};

module.exports = { fetchToUser };
