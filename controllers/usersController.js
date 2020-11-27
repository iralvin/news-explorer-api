const bcrypt = require("bcrypt");
const User = require("../models/user");
const NotFoundError = require("../error/NotFoundError");

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({
        email,
        password: hash,
        name,
      }).then((user) => {
        if (!user) {
          throw new NotFoundError(`Failed to create new user`, 400);
        }
        res.send(user);
      });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const {email, password} = req.body;
  User.find
};

const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  User.findOne({ _id: req.user._id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Failed to find current user", 404);
      }
      return res.send(user);
    })
    .catch(next);
};

module.exports = { getCurrentUser, createUser, login };
