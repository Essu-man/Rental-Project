import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAUC5EqgWGeuTkk3fvYHL886t9ZvZL4zPE",
  authDomain: "my-agrirent.firebaseapp.com",
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

// Function to add equipment to Firestore
export const addEquipment = async (equipmentData) => {
  try {
    const docRef = await addDoc(collection(db, "equipment"), equipmentData);
    console.log("Equipment added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding equipment: ", e);
  }
};

// Function to retrieve all equipment from Firestore
export const getEquipment = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "equipment"));
    const equipmentList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return equipmentList;
  } catch (e) {
    console.error("Error fetching equipment: ", e);
  }
};

export { auth, db };
