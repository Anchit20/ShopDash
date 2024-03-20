const mongoose = require("mongoose");

const productScheme = new mongoose.Schema({
  name: String,
  company: String,
  price: String,
  category: String,
  userID: String,
});

module.exports = mongoose.model("products", productScheme);
