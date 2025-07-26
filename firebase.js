// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAudHoXXwGiIQNPyFqdwQWFm6Gsvcdb34g",
  authDomain: "my-finance-demo.firebaseapp.com",
  projectId: "my-finance-demo",
  storageBucket: "my-finance-demo.firebasestorage.app",
  messagingSenderId: "696058722080",
  appId: "1:696058722080:web:5fb6cc83a8b3825b160945",
  measurementId: "G-VQX66F5CRJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app