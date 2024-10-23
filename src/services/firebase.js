// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // For Firestore

// Firebase configuration object (replace with your own config)
const firebaseConfig = {
  apiKey: "AIzaSyBedeMriUgfpnbOq5BY5W5Uey6SDSzbxZk",
  authDomain: "link-manager-f4fa2.firebaseapp.com",
  projectId: "link-manager-f4fa2",
  storageBucket: "link-manager-f4fa2.appspot.com",
  messagingSenderId: "1047022878505",
  appId: "1:1047022878505:web:ff01650fc87bfb2418c138",
  measurementId: "G-738ZP5V3MB"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore or Realtime Database
export const db = getFirestore(app); // Firestore Database
// export const db = getDatabase(app); // Realtime Database

export default app;
