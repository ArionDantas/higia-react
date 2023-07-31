import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBJTqPGGj2WR22DMvKm_12NzUqx9uqx77s",
  authDomain: "uploads-imagens-9f422.firebaseapp.com",
  projectId: "uploads-imagens-9f422",
  storageBucket: "uploads-imagens-9f422.appspot.com",
  messagingSenderId: "529646968383",
  appId: "1:529646968383:web:f203660a817fac4715628a",
  measurementId: "G-94N32GNWDT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
