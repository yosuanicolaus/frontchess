import React, { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import LoadingPage from "../components/LoadingPage";
import { firstLogIn, firstSignIn } from "./api";
import { socket } from "./socket";

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
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [uid, setUid] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  // TODO: convert anonymous to permanent email and password account
  // https://firebase.google.com/docs/auth/web/anonymous-auth?authuser=0&hl=en

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      let userDB;
      if (user) {
        console.log("user is signed in");
        userDB = await firstLogIn(user.uid);
      } else {
        try {
          console.log("new user detected, signing in anonymously");
          const credential = await signInAnonymously(auth);
          userDB = await firstSignIn(credential.user.uid);
        } catch (error) {
          console.log(error);
          window.location.reload();
        }
      }
      if (userDB.name && userDB.uid) setup(userDB);
    });

    return unsubscribe;
  }, []);

  const setup = (userDB) => {
    const { name, uid } = userDB;
    socket.emit("setup", { name, uid });
    setUid(uid);
    setName(name);
    setLoading(false);
  };

  if (loading) return <LoadingPage text={"Signing in..."} />;

  return (
    <AuthContext.Provider
      value={{
        name,
        uid,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { auth };
