//Importing node modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
// const swaggerUi = require('swagger-ui-express'),
//   swaggerDocument = require('./openapi.json');

//Express server
const app = express();

//Importing routes
// const authRoutes = require('./routes/auth.routes');
const restaurantRoutes = require('./routes/restaurant.routes');
const paymentRoutes = require('./routes/restaurant-payment.routes');
const vacancyRoutes = require('./routes/restaurant-vacancy.routes');

//Middlewares configuration
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//Routes configuration
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use(`/api/${process.env.VERSION}/restaurant`, authRoutes);
app.use(`/api/${process.env.VERSION}/restaurant`, restaurantRoutes);
app.use(`/api/${process.env.VERSION}/restaurant`, paymentRoutes);
app.use(`/api/${process.env.VERSION}/restaurant`, vacancyRoutes);
app.use(function(err, req, res, next) {
  return res
    .status(401)
    .json({ error: `${err.name} because of ${err.message}` });
});

module.exports = app;
