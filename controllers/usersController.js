const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const PostError = require('../errors/PostError');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  User.checkIfUserExists(email)
    .then((userExists) => {
      if (userExists) {
        throw new PostError();
      }
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          User.create({
            email,
            password: hash,
            name,
          }).then((user) => {
            if (!user) {
              throw new PostError();
            }
            res.send({
              message: 'Account successfully created',
              user: {
                name: user.name,
                email: user.email,
                _id: user._id,
              },
            });
          });
        })
        .catch(next);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret-dev-key',
        { expiresIn: '7d' }
      );

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
      res.send({ token, user });
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError();
      }
      return res.send(user);
    })
    .catch(next);
};

module.exports = { getCurrentUser, createUser, login };
