import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Inicializar Firebase diretamente com as credenciais em caso de falha com env
const fallbackConfig = {
  apiKey: "AIzaSyCyJLIOs4LuUg3wMkxkK9UOzGDBF2tQgHE",
  authDomain: "nutriplan-app-75faa.firebaseapp.com",
  projectId: "nutriplan-app-75faa",
  storageBucket: "nutriplan-app-75faa.firebasestorage.app",
  messagingSenderId: "162618694330",
  appId: "1:162618694330:web:56f8cfbb93290bac904083"
};

// Verifica se as variáveis de ambiente estão disponíveis
const config = Object.values(firebaseConfig).some(value => !value) 
  ? fallbackConfig 
  : firebaseConfig;

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(config) : getApps()[0];

// Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };