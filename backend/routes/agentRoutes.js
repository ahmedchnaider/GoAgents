const express = require('express');
const router = express.Router();
const { interactWithAgent } = require('../controllers/agentController');

router.post('/interact/:agentId', interactWithAgent);

module.exports = router; 