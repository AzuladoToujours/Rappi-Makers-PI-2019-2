const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
// const swaggerUi = require('swagger-ui-express'),
//   swaggerDocument = require('./openapi.json');
const morganMode = 'dev';
const paymentRestaurantRoutes = require('./routes/payment-restaurant.routes');
const paymentContractRoutes = require('./routes/payment-contract.routes');

//Middlewares
app.use(morgan(morganMode));
app.use(bodyParser.json());
app.use(cors());

//Routes
//Adding swagger docs
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(`/api/${process.env.VERSION}/payment`, paymentRestaurantRoutes);
app.use(`/api/${process.env.VERSION}/payment`, paymentContractRoutes);

app.use(function (err, req, res, next) {
  return res
    .status(401)
    .json({ error: `${err.name} because of ${err.message}` });
});
module.exports = app;
