const mongoose = require("mongoose");
const validator = require("validator");

const articleSchema = new mongoose.Schema({
  keyword: {
    required: true,
    type: String,
  },
  title: {
    required: true,
    type: String,
  },
  text: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: String,
  },
  source: {
    required: true,
    type: String,
  },
  link: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    type: String,
    validate: {
      validator(v) {
        return /^http(s)?:\/\/[\w.-]+(?:\.[\w.-]+)+[\w-./?#&=]+$/gi.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    select: false,
  },
});

module.exports = mongoose.model("article", articleSchema);
