import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyJLIOs4LuUg3wMkxkK9UOzGDBF2tQgHE",
  authDomain: "nutriplan-app-75faa.firebaseapp.com",
  projectId: "nutriplan-app-75faa",
  storageBucket: "nutriplan-app-75faa.firebasestorage.app",
  messagingSenderId: "162618694330",
  appId: "1:162618694330:web:56f8cfbb93290bac904083"
};

// Initialize Firebase
let app;
try {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
} catch (error) {
  console.error("Erro ao inicializar Firebase:", error);
  throw error;
}

// Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };