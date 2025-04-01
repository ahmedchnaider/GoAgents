const express = require('express');
const { createPaymentIntent, getConfig, handleWebhook, cancelPaymentIntent } = require('../controllers/stripeController');
const router = express.Router();

// Route to create payment intent
router.post('/create-payment-intent', createPaymentIntent);

// Route to cancel payment intent
router.post('/cancel-payment-intent', cancelPaymentIntent);

// Route to get publishable key and configuration
router.get('/config', getConfig);

// Webhook route for handling Stripe events
// Note: This route should use raw body parser
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

module.exports = router; 