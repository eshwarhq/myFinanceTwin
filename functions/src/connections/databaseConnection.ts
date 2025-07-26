// functions/firebase.ts
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import path from 'path';
// import { Certificate } from 'crypto';

dotenv.config();

const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || `certificate.json`;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      require(path.resolve(serviceAccountPath))
    )
  });
}

const db = admin.firestore();
const auth = admin.auth();

export { db, auth };
