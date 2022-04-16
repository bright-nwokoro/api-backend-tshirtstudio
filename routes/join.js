const express = require('express');

const join = require('../controllers/join');
const { authToken, setAuthHeaders } = require('../utils/token');

const router = express.Router();

router.post('/', join);

module.exports = router;