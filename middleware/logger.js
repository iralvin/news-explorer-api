const expressWinston = require("express-winston");
const winston = require("winston");

const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: "util/requests.log" })],
  format: winston.format.json(),
});

const errorLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: "util/error.log",
    }),
  ],
  format: winston.format.json(),
});

module.exports = { requestLogger, errorLogger };
