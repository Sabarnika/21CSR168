const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  discount: {
    type: Number,
    required: true,
  },
  availability: {
    type: String,
    enum: ["yes", "out-of-stock"],
    default: "out-of-stock",
  }
});
const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  products: [productSchema],
});
const techModel = mongoose.model("Company", companySchema);
module.exports = techModel;
