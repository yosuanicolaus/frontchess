import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPLcgqoAOKM3J__Grk7a0lygcMXZ97glo",
  authDomain: "logichess-b55af.firebaseapp.com",
  projectId: "logichess-b55af",
  storageBucket: "logichess-b55af.appspot.com",
  messagingSenderId: "1059982282051",
  appId: "1:1059982282051:web:a73b309e107298104973f6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("user is signed in");
    if (user.isAnonymous) {
      updateProfile(user, { displayName: `Anonymous ${user.uid.slice(0, 8)}` });
    }
    console.log(user.displayName);
  } else {
    console.log("user is signed out, signing in anonymously");
    signInAnonymously(auth).then(() => {
      console.log("signed in anonymously");
    });
  }
});

export { auth };
