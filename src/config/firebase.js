// src/config/firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCjYuY7p_SxSyWzBZFcwpf-w2uaFcNQ6tU",
  authDomain: "community-d02e6.firebaseapp.com",
  projectId: "community-d02e6",
  storageBucket: "community-d02e6.appspot.com",
  messagingSenderId: "819740624276",
  appId: "1:819740624276:web:199cde159b27650ea13b81",
  measurementId: "G-M77BR3Z6J4"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

<<<<<<< Updated upstream
// ✅ Services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// ✅ Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// ✅ Export
export { auth, db, storage, googleProvider };
=======
// ✅ Export Firebase tools
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app); // ✅ This is required for Firestore access
>>>>>>> Stashed changes
