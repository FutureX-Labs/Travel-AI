const mongoose = require("mongoose");
const { Schema } = mongoose;

const auth = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("auth", auth);
