require("dotenv").config();

const { PORT = 3000 } = process.env;

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

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
app.post("signin", login);
app.post("/signup", createUser);

app.use(auth);

app.use("/", usersRouter);
app.use("/", articlesRouter);

app.use(errorLogger);

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
