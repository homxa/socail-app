import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage'

const firebaseConfig = {

  apiKey: "AIzaSyCHKDoL33Mc40DYwi9CGZOZoThuVmkR_Cw",

  authDomain: "create-post-353eb.firebaseapp.com",

  projectId: "create-post-353eb",

  storageBucket: "create-post-353eb.appspot.com",

  messagingSenderId: "889026807883",

  appId: "1:889026807883:web:7f4dbb4e21faa8fbeea5ce"

};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider()
export const storage = getStorage(app)