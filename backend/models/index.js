const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newSchema = new Schema({
  date: Date,
  city: String,
  country: String,
});

module.exports = mongoose.model("User", newSchema);
