const admin = require('firebase-admin');

/**
 * Initialize Firebase Admin with environment variables or JSON file
 * This centralizes Firebase initialization to avoid duplicate initialization
 */
const initializeFirebase = () => {
  if (admin.apps.length) {
    return admin; // Already initialized
  }

  try {
    // Check if environment variables are available for Firebase
    if (process.env.FIREBASE_PROJECT_ID && 
        process.env.FIREBASE_PRIVATE_KEY && 
        process.env.FIREBASE_CLIENT_EMAIL) {
      // Use environment variables (recommended for production)
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
        databaseURL: process.env.FIREBASE_DATABASE_URL || `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
      });
      console.log('Firebase initialized with environment variables');
    } else {
      // Fall back to service account JSON file (development mode)
      const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || '../go-agent-2ce60-firebase-adminsdk-fbsvc-bbdb1786e4.json';
      admin.initializeApp({
        credential: admin.credential.cert(require(serviceAccountPath)),
        databaseURL: process.env.FIREBASE_DATABASE_URL || "https://go-agent-2ce60.firebaseio.com"
      });
      console.log(`Firebase initialized with service account file: ${serviceAccountPath}`);
    }
    return admin;
  } catch (error) {
    console.error('Firebase initialization error:', error);
    throw error;
  }
};

// Initialize and export Firebase admin
const firebase = initializeFirebase();
module.exports = firebase; 