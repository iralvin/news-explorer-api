const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
});

const errorMessage = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  return res.status(statusCode).send({
    message: statusCode === 500 ? 'Server error occurred' : message,
  });
};

module.exports = { limiter, errorMessage };
