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


const rateLimit = require("express-rate-limit");

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

//  apply to all requests
app.use(limiter);









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
  res.status(statusCode).send({
    message: statusCode === 500 ? "Server error occurred" : message,
  });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
