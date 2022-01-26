import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./constants/firebaseConfig";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore();
