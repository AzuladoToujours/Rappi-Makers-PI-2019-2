const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const userRoutes = require('./routes/user.routes');
const userVacancyRoutes = require('./routes/user-vacancy.routes');
const userContractRoutes = require('./routes/user-contracts.routes');

// const swaggerUi = require('swagger-ui-express'),
//   swaggerDocument = require('./openapi.json');
const morganMode = 'dev';

//Middlewares
app.use(morgan(morganMode));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Routes
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(`/api/${process.env.VERSION}/user`, userRoutes);
app.use(`/api/${process.env.VERSION}/user`, userVacancyRoutes);
app.use(`/api/${process.env.VERSION}/user`, userContractRoutes);
app.use(function(err, req, res, next) {
  return res
    .status(401)
    .json({ error: `${err.name} because of ${err.message}` });
});

module.exports = app;
