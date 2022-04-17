const express = require("express");

const { authToken } = require("../utils/token");

const { addCart, getCart } = require("../controllers/cart.js");

const router = express.Router();

router.get("/", authToken, getCart);

router.post("/", authToken, addCart);

module.exports = router;
