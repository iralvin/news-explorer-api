require("dotenv").config();

const { PORT = 3000 } = process.env;

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { celebrate, Joi, errors } = require("celebrate");
const cors = require("cors");
const helmet = require("helmet");
const { limiter, errorMessage } = require("./util/constants");

const { createUser, login } = require("./controllers/usersController");
const { auth } = require("./middleware/auth");
const { usersRouter } = require("./routes/users");
const { articlesRouter } = require("./routes/articles");
const { requestLogger, errorLogger } = require("./middleware/logger");
const { MONGO_DATABASE } = process.env;

const app = express();
app.use(helmet());

mongoose.connect(MONGO_DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.options("*", cors());
app.use(cors());
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(limiter);

app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  login
);
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
      name: Joi.string().required(),
    }),
  }),
  createUser
);

app.use(auth);

app.use("/", usersRouter);
app.use("/", articlesRouter);

app.use(errorLogger);
app.use(errors());

app.use(errorMessage);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
