import React, { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import LoadingPage from "../components/LoadingPage";
import { firstLogIn, firstSignIn } from "./api";
import { socket } from "./socket";
import { User } from "./types";

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

type AuthContextValue = {
  name: string;
  uid: string;
};

const AuthContext = createContext<AuthContextValue>(null!);

export function useAuth() {
  return useContext(AuthContext);
}

type AuthProviderProps = {
  children: JSX.Element;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [uid, setUid] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  // TODO: convert anonymous to permanent email and password account
  // https://firebase.google.com/docs/auth/web/anonymous-auth?authuser=0&hl=en

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        console.log("user is signed in");
        const userDB = (await firstLogIn(authUser.uid)) as User;

        if (userDB) {
          setup(userDB);
        } else {
          const newUser = (await firstSignIn(authUser.uid)) as User;
          setup(newUser);
        }
      } else {
        console.log("new user detected, signing in anonymously");
        signInAnonymously(auth);
      }
    });

    return unsubscribe;
  }, []);

  const setup = (userDB: User) => {
    const { name, uid } = userDB;
    socket.emit("setup", { name, uid });
    setUid(uid);
    setName(name);
  };

  if (name === null || uid === null)
    return <LoadingPage text={"Signing in..."} />;

  return (
    <AuthContext.Provider value={{ name, uid }}>
      {children}
    </AuthContext.Provider>
  );
}

export { auth };
