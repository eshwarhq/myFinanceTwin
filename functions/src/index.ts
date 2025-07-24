// index.ts
import { onRequest } from 'firebase-functions/v2/https';
// import * as logger from 'firebase-functions/logger';
import * as admin from 'firebase-admin';
import app from './server';

// ✅ Initialize Admin SDK (one-time)
if (!admin.apps.length) {
  admin.initializeApp();
  console.log('Firebase Admin Initialized');
}

// ✅ Export HTTPS function with options
export const api = onRequest(
  {
    region: 'asia-south1', // closest to India
    memory: '512MiB',
    timeoutSeconds: 60,
  },
  app
);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Dev server: ${PORT}`);
});