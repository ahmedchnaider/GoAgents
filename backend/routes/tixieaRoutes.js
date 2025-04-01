const express = require('express');
const router = express.Router();
const { makeCall } = require('../controllers/tixieaController');

router.post('/call', makeCall);

module.exports = router; 