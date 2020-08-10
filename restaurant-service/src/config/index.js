const { merge } = require('lodash');
const dotenv = require('dotenv');
const { Pool } = require('pg');
dotenv.config();
const env = process.env.ENV || 'dev';

const baseConfig = {
  env,
  isDev: env === 'dev',
  isProd: env === 'prod',
  dbPort: process.env.DB_PORT,
  port: process.env.PORT
};

let envConfig = {};

switch (env) {
  case 'dev':
    envConfig = require('./dev').config;
    break;
  case 'prod':
    envConfig = require('./prod').config;
    break;
  default:
    envConfig = require('./dev').config;
}

const configs = merge(baseConfig, envConfig);

const pool = new Pool({
  host: configs.host,
  user: configs.user,
  password: configs.password,
  database: configs.database,
  port: configs.dbPort
});

const dbQuery = {
  /**
   * Executes a DB Query
   * @param {string} text
   * @param {Array} params
   * @returns {object} object
   */
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool
        .query(text, params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

module.exports = { configs, dbQuery };
