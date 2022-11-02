import admin from 'firebase-admin';
import 'dotenv/config';
​
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
};
​
admin.initializeApp(firebaseConfig);

export const db = admin.firestore();