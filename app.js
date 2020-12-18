require('dotenv').config();

const {
  PORT = 3000,
  MONGO_DATABASE = 'mongodb://localhost:27017/dev-news',
} = process.env;

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const { limiter, errorMessage } = require('./util/constants');

const { mainRouter } = require('./routes/index');
const { requestLogger, errorLogger } = require('./middleware/logger');

const app = express();
app.use(helmet());

mongoose.connect(MONGO_DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.options('*', cors());
app.use(cors());
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.use(limiter);

app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);

app.use(mainRouter);

app.use(errorLogger);
app.use(errors());

app.use(errorMessage);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${PORT}`);
});
