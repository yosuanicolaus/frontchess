import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPLcgqoAOKM3J__Grk7a0lygcMXZ97glo",
  authDomain: "logichess-b55af.firebaseapp.com",
  projectId: "logichess-b55af",
  storageBucket: "logichess-b55af.appspot.com",
  messagingSenderId: "1059982282051",
  appId: "1:1059982282051:web:a73b309e107298104973f6",
};

console.log(firebaseConfig);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
