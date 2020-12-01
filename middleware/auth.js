const jwt = require("jsonwebtoken");
const NotAuthError = require("../error/NotAuthError")

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    const err = new NotAuthError("Not authorized");
    next(err);
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret"
    );
  } catch (e) {
    const err = new NotAuthError("Not authorized");
    next(err);
  }

  req.user = payload;
  next();
};

module.exports = { auth };
