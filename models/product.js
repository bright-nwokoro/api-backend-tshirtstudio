const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    backImage: {
      type: String,
      required: true,
    },
    frontImage: {
      type: String,
      required: true,
    },
    size: {
      type: Array,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
