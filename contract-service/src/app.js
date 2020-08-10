const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const UnauthorizeError = require('./errors/unauthorize-error');
dotenv.config();

const contractRoutes = require('./routes/contract.routes');
const userRoutes = require('./routes/user/user.routes');
const restaurantRoutes = require('./routes/restaurant/restaurant.routes');

// const swaggerUi = require('swagger-ui-express'),
//   swaggerDocument = require('./openapi.json');
const morganMode = 'dev';

//Middlewares
app.use(morgan(morganMode));
app.use(bodyParser.json());
app.use(cors());

//Routes
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(`/api/${process.env.VERSION}/contract`, contractRoutes);
app.use(`/api/${process.env.VERSION}/contract`, userRoutes);
app.use(`/api/${process.env.VERSION}/contract`, restaurantRoutes);

app.use(function (err, req, res, next) {
  let unauthorize = new UnauthorizeError();
  return unauthorize.errorJwt(res, err.message);
});

module.exports = app;
