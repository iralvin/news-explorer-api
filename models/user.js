/* eslint-disable func-names */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const LoginError = require('../errors/LoginError');

const userSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '',
    },
  },
  password: {
    required: true,
    type: String,
    select: false,
    minlength: 8,
  },
  name: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new LoginError();
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new LoginError();
        }
        return user;
      });
    });
};

userSchema.statics.checkIfUserExists = function (email) {
  return this.find({ email }).then((user) => {
    if (user.length === 0) {
      return false;
    }
    return true;
  });
};

module.exports = mongoose.model('user', userSchema);
