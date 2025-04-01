require('dotenv').config();
const express = require('express');
const cors = require('cors');
const tixieaRoutes = require('./routes/tixieaRoutes');
const stripeRoutes = require('./routes/stripeRoutes');
const signupRoutes = require('./routes/signupRoutes');
const agentRoutes = require('./routes/agentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Update CORS configuration to use environment variables for production
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Special handling for Stripe webhook route
app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }));

// Regular body parser for other routes
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('GoAgent API Server');
});

// Routes
app.use('/api/tixiea', tixieaRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/signup', signupRoutes);
app.use('/api/agent', agentRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});