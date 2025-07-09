// src/config/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCjYuY7p_SxSyWzBZFcwpf-w2uaFcNQ6tU",
  authDomain: "community-d02e6.firebaseapp.com",
  projectId: "community-d02e6",
  storageBucket: "community-d02e6.appspot.com",
  messagingSenderId: "819740624276",
  appId: "1:819740624276:web:199cde159b27650ea13b81",
  measurementId: "G-M77BR3Z6J4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth, Firestore, Storage
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

export { auth, db, storage, googleProvider };
