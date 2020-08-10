const dotenv = require('dotenv');
dotenv.config();

const config = {
  apiUrl: process.env.PROD_URL,
  host: process.env.PROD_DB_HOST,
  user: process.env.PROD_DB_USER,
  password: process.env.PROD_DB_PWD,
  database: process.env.PROD_DB_NAME
};

module.exports = { config };
