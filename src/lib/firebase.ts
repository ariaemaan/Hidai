import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCmAhW_MjHHjBEBOmo6VNzYQfCB0IoZFz4",
  authDomain: "kabuli-coins.firebaseapp.com",
  projectId: "kabuli-coins",
  storageBucket: "kabuli-coins.firebasestorage.app",
  messagingSenderId: "1048891252149",
  appId: "1:1048891252149:web:218161d421e72c90a84dfc"
};

const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);

const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        return result.user;
    } catch (error) {
        console.error("Error during Google sign-in:", error);
        throw error;
    }
};

export { app, auth, signInWithGoogle };
