const admin = require('firebase-admin');
// Node.js v20 has built-in fetch, no need to import

// Initialize Firebase Admin with environment variables or JSON file
if (!admin.apps.length) {
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
  } catch (error) {
    console.error('Firebase initialization error:', error);
    process.exit(1);
  }
}

const db = admin.firestore();

// Check if email exists in Firestore
async function checkEmailExists(email) {
  console.log(`Checking if email ${email} already exists in Firestore...`);
  const usersRef = db.collection('Users');
  const snapshot = await usersRef.where('email', '==', email).get();
  return !snapshot.empty;
}

// Create Firebase Auth user
async function createFirebaseUser(email, password, name) {
  console.log(`Creating Firebase Auth user for ${email}...`);
  return await admin.auth().createUser({
    email,
    password,
    displayName: name
  });
}

// Create Tixae Organization
async function createTixaeOrg(name) {
  console.log(`Creating Tixae organization for ${name}...`);
  
  // Use API_KEY from environment variables
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error('API_KEY environment variable is not set');
  }
  
  const options = {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      preferredLanguage: "eng",
      widgetIDs: [
        "rv2sad5wvcwt8cip"
      ],
      canSelfEdit: true,
      disallowAnyTags: false,
      dashboardLayout: "horizontal"
    })
  };

  const response = await fetch('https://eu-vg-edge.moeaymandev.workers.dev/v2/orgs', options);
  const data = await response.json();
  
  console.log('Tixae organization creation response:', data);
  
  if (!data.success) {
    throw new Error(`Failed to create Tixae organization: ${JSON.stringify(data)}`);
  }
  
  if (!data.data?.ID) {
    throw new Error(`No organization ID in response: ${JSON.stringify(data)}`);
  }
  
  console.log(`Successfully created organization with ID: ${data.data.ID}`);
  return data;
}

// Create Tixae Client
async function createTixaeClient(orgId, name, email, password) {
  console.log(`Creating Tixae client for org ID ${orgId}...`);
  
  // Use API_KEY from environment variables
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error('API_KEY environment variable is not set');
  }
  
  const options = {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      orgId: orgId,
      name: name,
      email: email,
      dashboardPassword: password,
      canAccess: [ 
        "/home",
        "/prompt",
        "/overview",
        "/voice",
        "/billing",
        "/convos",
        "/analytics",
        "/channels",
        "/leads",
        "/kb",
        "/settings"],
      isOrgAdmin: true
    })
  };

  const response = await fetch('https://eu-vg-edge.moeaymandev.workers.dev/v2/clients', options);
  const data = await response.json();
  
  console.log('Tixae client creation response:', data);
  
  if (!data.success) {
    console.warn(`Warning: Failed to create Tixae client: ${JSON.stringify(data)}`);
  }
  
  return data;
}


// Main signup handler
exports.signup = async (req, res) => {
  const { name, email, password, businessType, plan } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Step 1: Check if email exists in Firestore
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      console.log(`Email ${email} already exists in Firestore`);
      return res.status(409).json({ message: 'User already exists' });
    }

    // Step 2: Create Firebase Auth user
    const userRecord = await createFirebaseUser(email, password, name);
    console.log(`Firebase user created with ID: ${userRecord.uid}`);

    // Step 3: Create Tixae organization
    let tixaeOrgData = null;
    let tixaeClientData = null;
    try {
      tixaeOrgData = await createTixaeOrg(name);
      
      // Step 4: Create Tixae client using org ID
      const orgId = tixaeOrgData.data.ID;
      console.log(`Using organization ID ${orgId} to create client`);
      
      tixaeClientData = await createTixaeClient(orgId, name, email, password);
    } catch (tixaeError) {
      console.error('Error during Tixae API calls:', tixaeError);
      // Continue with user creation even if Tixae API calls fail
    }

    // Step 5: Save all data to Firestore
    const userData = {
      name,
      email,
      businessType: businessType || '',
      plan: plan || 'free',
      tixaeOrg: tixaeOrgData,
      tixaeClient: tixaeClientData,
    };
    
    
// Save user data to Firestore
async function saveToFirestore(userId, userData) {
  console.log(`Saving user data to Firestore for user ID ${userId}...`);
  await db.collection('Users').doc(userId).set({
    ...userData,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });
  console.log('User data saved to Firestore successfully');
}
await saveToFirestore(userRecord.uid, userData);

    // Step 6: Return success response
    res.status(201).json({
      message: 'User created successfully',
      userId: userRecord.uid,
      ...userData
    });

  } catch (error) {
    console.error('Signup Error:', error);
    
    if (error.code === 'auth/email-already-in-use') {
      return res.status(409).json({ message: 'User already exists' });
    }
    
    res.status(500).json({ 
      message: 'Error creating user',
      error: error.message
    });
  }
};