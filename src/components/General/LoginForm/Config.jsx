// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


/*
const apiKey = process.env.REACT_APP_firebase_API_key;
const authDomain = process.env.REACT_APP_firebase_API_key;
const projectId = process.env.REACT_APP_firebase_API_key;
const storageBucket = process.env.REACT_APP_firebase_API_key;
const messagingSenderId = process.env.REACT_APP_firebase_API_key;
const appId = process.env.REACT_APP_firebase_API_key;
*/

const firebaseConfig = {
  apiKey: 'AIzaSyBilCm7QE3pvNbVKJ20MOaawb0dGo4nWNM',
  authDomain: 'tundralp.firebaseapp.com',
  projectId: 'tundralp',
  storageBucket: 'tundralp.appspot.com',
  messagingSenderId: '999641064309',
  appId: '1:999641064309:web:e920b765e071afe694693c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.addScope('email');
export { auth, provider };