// index.ts
import { onRequest } from 'firebase-functions/v2/https';
// import * as logger from 'firebase-functions/logger';
import * as admin from 'firebase-admin';
import app from './server';
import * as dotenv from 'dotenv';

// ✅ Initialize Admin SDK (one-time)
if (!admin.apps.length) {
  admin.initializeApp();
  console.log('Firebase Admin Initialized');
}

dotenv.config();

// ✅ Export HTTPS function with options
export const api = onRequest(
  {
    region: 'asia-south1', // closest to India
    memory: '512MiB',
    timeoutSeconds: 60,
  },
  app
);

const PORT = process.env.PORT || 5000;
console.log("Express server started at port: ", PORT)
app.listen(PORT, () => {
  console.log(`Dev server: ${PORT}`);
});