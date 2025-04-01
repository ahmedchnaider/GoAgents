const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * Creates a payment intent for Stripe
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.createPaymentIntent = async (req, res) => {
  try {
    const { 
      amount, 
      currency = 'usd', 
      plan,
      payment_method_types = ['card'],
      enable_link = false
    } = req.body;
    
    if (!amount) {
      return res.status(400).json({ error: 'Amount is required' });
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntentParams = {
      amount, // amount in cents
      currency,
      metadata: {
        plan: plan || 'free',
      }
    };

    // Either use automatic payment methods OR specified payment method types, not both
    if (payment_method_types && payment_method_types.length > 0) {
      paymentIntentParams.payment_method_types = payment_method_types;
    } else {
      // Only use automatic payment methods if no specific payment_method_types are provided
      paymentIntentParams.automatic_payment_methods = {
        enabled: true
      }
    }

    const paymentIntent = await stripe.paymentIntents.create(paymentIntentParams);

    // Send client_secret to client
    res.json({
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Cancels an abandoned payment intent
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.cancelPaymentIntent = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    
    if (!paymentIntentId) {
      return res.status(400).json({ error: 'Payment Intent ID is required' });
    }

    // Cancel the payment intent
    const canceledPaymentIntent = await stripe.paymentIntents.cancel(paymentIntentId);

    res.json({ 
      success: true,
      id: canceledPaymentIntent.id,
      status: canceledPaymentIntent.status
    });
  } catch (error) {
    console.error('Error canceling payment intent:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Creates setup for Stripe Elements
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getConfig = async (req, res) => {
  // Return the publishable key to the client
  res.json({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
  });
};

/**
 * Handles Stripe webhooks
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(
      req.rawBody, // You need body-parser configured to get raw body
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle specific event types
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful!', paymentIntent.id);
      // Update your database, send emails, etc.
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      console.log('PaymentMethod was attached!', paymentMethod.id);
      break;
    // Handle other event types as needed
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true });
}; 