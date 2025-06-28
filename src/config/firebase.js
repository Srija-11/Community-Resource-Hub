// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Needed for Firestore

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC_xvAfYsDejojk9Lp7KrWg_SQ-a58eF9s",
  authDomain: "community-resource-hub.firebaseapp.com",
  projectId: "community-resource-hub",
  storageBucket: "community-resource-hub.firebasestorage.app",
  messagingSenderId: "152459414724",
  appId: "1:152459414724:web:83cf65cfb03deb79368d91",
  measurementId: "G-5NFKX2TH4K"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export Firebase tools
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app); // ✅ This is required for Firestore access
