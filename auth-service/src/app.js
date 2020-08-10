const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
dotenv.config();

const morganMode = 'dev';

//Middlewares
app.use(morgan(morganMode));
app.use(cors());
app.use(bodyParser.json());

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/users.routes');
const restaurantRoutes = require('./routes/restaurant.routes');

//Routes
app.use(`/api/${process.env.VERSION}/auth/`, authRoutes);
app.use(`/api/${process.env.VERSION}/auth/restaurant`, restaurantRoutes);
app.use(`/api/${process.env.VERSION}/auth/user`, userRoutes);

app.use(function (err, req, res, next) {
  return res
    .status(401)
    .json({ error: `${err.name} because of ${err.message}` });
});

module.exports = app;
