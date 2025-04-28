// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyA_rtCFkdiSZ3gWv_lfrGolRl6J6CYyXQs",
  authDomain: "family-gpt-ba248.firebaseapp.com",
  databaseURL: "https://family-gpt-ba248-default-rtdb.firebaseio.com",
  projectId: "family-gpt-ba248",
  storageBucket: "family-gpt-ba248.firebasestorage.app",
  messagingSenderId: "117240347335",
  appId: "1:117240347335:web:34384074ad80eb92dddce2",
  measurementId: "G-YRZEXRZZCV"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);