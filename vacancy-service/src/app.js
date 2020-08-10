const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const UnauthorizeError = require('./errors/unauthorize-error');
dotenv.config();
const vacancyRoutes = require('./routes/vacancy.routes');
const vacancyRestaurantRoutes = require('./routes/vacancy-restaurant.routes');
const vacancyUserRoutes = require('./routes/vacancy-user.routes');
// const swaggerUi = require('swagger-ui-express'),
//   swaggerDocument = require('./openapi.json');
const morganMode = 'dev';

//Middlewares
app.use(morgan(morganMode));
app.use(bodyParser.json());
// app.use(expressValidator());
app.use(cors());

//Routes
//Adding swagger docs
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(`/api/${process.env.VERSION}/vacancy`, vacancyRoutes);
app.use(`/api/${process.env.VERSION}/vacancy`, vacancyRestaurantRoutes);
app.use(`/api/${process.env.VERSION}/vacancy`, vacancyUserRoutes);
app.use(function (err, req, res, next) {
  let unauthorize = new UnauthorizeError();

  return unauthorize.errorJwt(res, err.message);
});

module.exports = app;
