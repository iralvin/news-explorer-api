require("dotenv").config();

const { PORT = 3000 } = process.env;

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { celebrate, Joi, errors } = require("celebrate");

const { createUser, login } = require("./controllers/usersController");
const { auth } = require("./middleware/auth");
const { usersRouter } = require("./routes/users");
const { articlesRouter } = require("./routes/articles");
const { requestLogger, errorLogger } = require("./middleware/logger");

const app = express();

mongoose.connect("mongodb://localhost:27017/articles", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);

app.post("/signin", login);
app.post("/signup", createUser);

app.use(auth);

app.use("/", usersRouter);
app.use("/", articlesRouter);

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.statusCode(statusCode).send({
    message: statusCode === 500 ? "Server error occurred" : message,
  });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
