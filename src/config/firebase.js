// src/config/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // ✅ Needed for EmergencyDocs

const firebaseConfig = {
  apiKey: "AIzaSyAKxLVLgy4T3iE7rRBv6Yc4LJKYdCwmyQo",
  authDomain: "community-resource-27355.firebaseapp.com",
  projectId: "community-resource-27355",
  storageBucket: "community-resource-27355.appspot.com", // ✅ FIXED (was .app)
  messagingSenderId: "976853412914",
  appId: "1:976853412914:web:ce054d93bae0eb2474a02b",
  measurementId: "G-K6HKX63NFN"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Firebase Services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app); // ✅ For file upload
