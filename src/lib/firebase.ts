// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableMultiTabIndexedDbPersistence } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmAhW_MjHHjBEBOmo6VNzYQfCB0IoZFz4",
  authDomain: "kabuli-coins.firebaseapp.com",
  projectId: "kabuli-coins",
  storageBucket: "kabuli-coins.firebasestorage.app",
  messagingSenderId: "1048891252149",
  appId: "1:1048891252149:web:218161d421e72c90a84dfc"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);


// Enable Firestore offline persistence
// This caches user data for offline access and seamless experience.
enableMultiTabIndexedDbPersistence(db).catch((err) => {
  if (err.code == 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled in one tab at a time.
    console.warn('Firestore persistence failed: multiple tabs open.');
  } else if (err.code == 'unimplemented') {
    // The current browser does not support all of the features required to enable persistence
    console.warn('Firestore persistence not available in this browser.');
  }
});


// Initialize Analytics if supported
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

export { app, db, storage, auth, analytics };
