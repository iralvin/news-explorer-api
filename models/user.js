const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const NotFoundError = require("../error/NotFoundError");

const userSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "",
    },
  },
  password: {
    required: true,
    type: String,
    select: false,
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
    .select("+password")
    .then((user) => {
      if (!user) {
        console.log("mismatch user");
        throw new NotFoundError("Incorrect email/password", 401);
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        console.log("asdf");
        if (!matched) {
          console.log("mismatch password");
          throw new NotFoundError("Incorrect email/password", 401);
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
