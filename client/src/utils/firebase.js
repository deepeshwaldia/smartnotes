
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "authexamnotes-cba7c.firebaseapp.com",
  projectId: "authexamnotes-cba7c",
  storageBucket: "authexamnotes-cba7c.firebasestorage.app",
  messagingSenderId: "370136958703",
  appId: "1:370136958703:web:ffa07d1b5556990c9d3d1a"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth , provider}