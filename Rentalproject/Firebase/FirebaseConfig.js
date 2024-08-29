import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAUC5EqgWGeuTkk3fvYHL886t9ZvZL4zPE",
  authDomain: "my-agrirent.firebaseapp.com",
  databaseURL: "https://my-agrirent-default-rtdb.firebaseio.com",
  projectId: "my-agrirent",
  storageBucket: "my-agrirent.appspot.com",
  messagingSenderId: "160492957249",
  appId: "1:160492957249:web:3c002379984c17cb90a0c0",
  measurementId: "G-ELRKKC4E73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
