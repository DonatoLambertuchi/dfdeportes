
import { initializeApp } from
  "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import { getFirestore } from
  "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAl2oJ2KACZJlf9Ld-16mk1Dx6kUiF2zCU",
  authDomain: "df-deportes-ayd.firebaseapp.com",
  projectId: "df-deportes-ayd",
  storageBucket: "df-deportes-ayd.firebasestorage.app",
  messagingSenderId: "364806451845",
  appId: "1:364806451845:web:566d01e599cea35b2eefec",
  measurementId: "G-ZVXG5B4XWL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
