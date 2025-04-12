# GoAgent Production Setup Guide

This guide outlines the steps to deploy the GoAgent application to production using Vercel (frontend) and Render (backend).

## Prerequisites

- GitHub repository with your code
- [Vercel](https://vercel.com/) account
- [Render](https://render.com/) account
- [Firebase](https://firebase.google.com/) project with Firestore and Authentication enabled
- [Stripe](https://stripe.com/) account for payment processing

## Environment Variables

### Frontend (Vercel)

Add these environment variables in the Vercel dashboard:

- `REACT_APP_API_URL`: Your production backend URL (e.g., ``)
- `REACT_APP_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
- `REACT_APP_DASHBOARD_URL`: Your dashboard URL (e.g., ``)

### Backend (Render)

Add these environment variables in the Render dashboard:

- `NODE_ENV`: `production`
- `PORT`: `10000` (or your preferred port)
- `FRONTEND_URL`: Your production frontend URL (e.g., ``)
- `API_KEY`: Your Tixiea API key
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
- `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook secret
- `FIREBASE_PROJECT_ID`: Your Firebase project ID
- `FIREBASE_PRIVATE_KEY`: Your Firebase private key (with newlines as `\\n`)
- `FIREBASE_CLIENT_EMAIL`: Your Firebase client email
- `FIREBASE_DATABASE_URL`: Your Firebase database URL

## Deployment Steps

### Frontend Deployment (Vercel)

1. Connect your GitHub repository to Vercel
2. Configure the project:
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Root Directory: `frontend`
3. Add the environment variables
4. Deploy

### Backend Deployment (Render)

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Configure the service:
   - Name: `goagent-backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Root Directory: `backend`
4. Add the environment variables
5. Deploy

## Post-Deployment Steps

1. Update the Stripe webhook endpoint in your Stripe dashboard to use your new backend URL
2. Test the entire flow from signup to payment to ensure everything works correctly

## CORS Configuration

The backend is already configured to accept requests from the frontend URL specified in the `FRONTEND_URL` environment variable. If you need to allow additional origins, update the CORS configuration in `server.js`.

## Firebase Setup

Instead of using a service account JSON file, the backend now uses environment variables for Firebase authentication in production. You should extract these values from your Firebase service account JSON file and add them to your environment variables.

## Troubleshooting

- If you encounter CORS issues, check that the `FRONTEND_URL` is correctly set
- If Firebase authentication fails, ensure all Firebase environment variables are correctly set
- Check server logs in Render for backend errors
- Check browser console for frontend errors

## Local Development

For local development, use the `.env.example` files in both frontend and backend directories as templates to create your own `.env` files. 