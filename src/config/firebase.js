// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Needed for Firestore
const firebaseConfig = {
  apiKey: "AIzaSyAKxLVLgy4T3iE7rRBv6Yc4LJKYdCwmyQo",
  authDomain: "community-resource-27355.firebaseapp.com",
  projectId: "community-resource-27355",
  storageBucket: "community-resource-27355.firebasestorage.app",
  messagingSenderId: "976853412914",
  appId: "1:976853412914:web:ce054d93bae0eb2474a02b",
  measurementId: "G-K6HKX63NFN"
};
// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export Firebase tools
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app); // ✅ This is required for Firestore access
