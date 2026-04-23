import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJZ-lJ5g0rFvbFF8ZChxZhKHmo_aG36bM",
  authDomain: "task-manager-7cb6f.firebaseapp.com",
  projectId: "task-manager-7cb6f",
  storageBucket: "task-manager-7cb6f.firebasestorage.app",
  messagingSenderId: "41004053940",
  appId: "1:41004053940:web:9d4d08fc0b2ead58396ee1",
  measurementId: "G-9NGDM4LR00",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
