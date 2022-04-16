const express = require("express");

const signIn = require("../controllers/signin");

const router = express.Router();

router.post("/", signIn);

module.exports = router;
