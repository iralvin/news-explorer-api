const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    // return error
    res.status(401).send({ message: "authorization required" });
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret"
    );
  } catch (e) {
    const err = new Error("Authorization required - failed to verify token");
    err.statusCode = 401;
    next(err);
  }

  req.user = payload;
  next();
};

module.exports = { auth };
