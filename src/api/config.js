/**
 * API Configuration for environment-specific URLs
 */

// API base URL - use environment variable with fallback
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Stripe publishable key
const STRIPE_PUBLISHABLE_KEY = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

/**
 * Helper function to build API endpoints
 * @param {string} path - The API path (should start with /)
 * @returns {string} The full API URL
 */
const endpoint = (path) => `${API_URL}${path}`;

export { API_URL, STRIPE_PUBLISHABLE_KEY, endpoint }; 