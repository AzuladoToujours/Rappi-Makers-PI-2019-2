const axios = require('axios');
require('dotenv').config();

const getUsersEmailFetch = (idsArray) => {
  let fetch = idsArray.map((id) => {
    return axios
      .get(`${process.env.USER_HOST}/getemail/${id}`)
      .then((res) => res.data.email)
      .catch((e) => console.log(e));
  });

  return fetch;
};

module.exports = { getUsersEmailFetch };
