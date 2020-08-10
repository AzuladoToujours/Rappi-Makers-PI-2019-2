const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const authRoutes = require('./routes/auth.routes');
const vacancyRoutes = require('./routes/vacancy.routes');

const morganMode = 'dev';

//Middlewares
app.use(morgan(morganMode));
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use(`/api/${process.env.VERSION}/mailer`, authRoutes);
app.use(`/api/${process.env.VERSION}/mailer`, vacancyRoutes);

module.exports = app;
