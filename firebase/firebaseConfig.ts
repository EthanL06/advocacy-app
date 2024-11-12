import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
import { getFirestore } from "firebase/firestore";
// import {...} from "firebase/functions";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDR0GPKQHBd0gfowWXoilatX32AYNmwsQQ",
  authDomain: "advocacy-convergent.firebaseapp.com",
  projectId: "advocacy-convergent",
  storageBucket: "advocacy-convergent.firebasestorage.app",
  messagingSenderId: "215462384497",
  appId: "1:215462384497:web:7259b22381a1b064851cd0",
  measurementId: "G-1TCJG7PVL4",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
