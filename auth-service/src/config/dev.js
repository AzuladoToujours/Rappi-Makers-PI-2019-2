const dotenv = require('dotenv');
dotenv.config();

const config = {
  apiUrl: process.env.DEV_URL,
  host: process.env.DEV_DB_HOST,
  user: process.env.DEV_DB_USER,
  password: process.env.DEV_DB_PWD,
  database: process.env.DEV_DB_NAME,
};

module.exports = { config };
