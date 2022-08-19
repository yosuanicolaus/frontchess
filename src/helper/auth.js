import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { postUserNew } from "./api";

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

onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("user is signed in");
  } else {
    console.log("new user detected, signing in anonymously");

    signInAnonymously(auth).then(async (auth) => {
      const user = await postUserNew(auth.user.uid);

      await updateProfile(auth.user, { displayName: user.name });
    });
  }
});

// TODO: create useAuth hook, use context & provider

export { auth };
