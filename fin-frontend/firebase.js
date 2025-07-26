// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // ✅ You forgot this!

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAudHoXXwGiIQNPyFqdwQWFm6Gsvcdb34g",
  authDomain: "my-finance-demo.firebaseapp.com",
  projectId: "my-finance-demo",
  storageBucket: "my-finance-demo.appspot.com", // ✅ fixed typo here
  messagingSenderId: "696058722080",
  appId: "1:696058722080:web:5fb6cc83a8b3825b160945",
  measurementId: "G-VQX66F5CRJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // ✅ Now properly defined

export { auth, analytics };
export default app;
