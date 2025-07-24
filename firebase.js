// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFwXr3UcpmgOPMWwt7KV5U5rjajiUcycw",
  authDomain: "myfinancetwin.firebaseapp.com",
  projectId: "myfinancetwin",
  storageBucket: "myfinancetwin.firebasestorage.app",
  messagingSenderId: "980065043675",
  appId: "1:980065043675:web:880f5095cb542a5455f8fe",
  measurementId: "G-VQX66F5CRJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app