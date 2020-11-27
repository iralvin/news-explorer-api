const mongoose = require("mongoose");
const validator = require("validator");

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
  },
});

userSchema.statics.findByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        // return error couldn't find user
      }
    });
};

module.exports = mongoose.model("user", userSchema);
