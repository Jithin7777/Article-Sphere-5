import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBMLCHW5jm0T1TRoYb59LAMWFvowlNugiA",
    authDomain: "react-blogs-app-5f2f9.firebaseapp.com",
    projectId: "react-blogs-app-5f2f9",
    storageBucket: "react-blogs-app-5f2f9.appspot.com",
    messagingSenderId: "229655292210",
    appId: "1:229655292210:web:551fa90c3c3b6dcb93cf2b"
  };


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);
  
  export { auth, db, storage };