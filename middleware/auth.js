const jwt = require('jsonwebtoken');
const NotAuthError = require('../errors/NotAuthError');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    const err = new NotAuthError();
    next(err);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'secret-dev-key',
    );
  } catch (e) {
    const err = new NotAuthError();
    next(err);
  }

  req.user = payload;
  next();
};

module.exports = { auth };
