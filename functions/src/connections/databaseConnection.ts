// functions/firebase.ts
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || '../my-finance-demo-firebase-adminsdk-fbsvc-6ba1da7c0d.json';

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
