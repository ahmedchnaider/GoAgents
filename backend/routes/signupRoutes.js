const express = require('express');
const { signup } = require('../controllers/signupController');
const router = express.Router();

// Route to handle signup
router.post('/', signup);

module.exports = router;