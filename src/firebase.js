// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'eshop-4647b.firebaseapp.com',
  projectId: 'eshop-4647b',
  storageBucket: 'eshop-4647b.appspot.com',
  messagingSenderId: '343789325553',
  appId: '1:343789325553:web:8ec4b5289da24c73d62d50',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
