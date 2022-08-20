import React, { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { postUserNew } from "./api";
import Loading from "../components/Loading";

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

/**
 * returns { user } that have "name" and "uid"
 * as its property, which you can then use to
 * call /game & /user API or emit socket events
 */
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      let authUser;
      if (user) {
        console.log("user is signed in");
        authUser = user;
      } else {
        console.log("new user detected, signing in anonymously");
        const userCredential = await signInAnonymously(auth);
        const anonymousUser = userCredential.user;
        const userDB = await postUserNew(anonymousUser.uid);
        await updateProfile(anonymousUser, { displayName: userDB.name });
        authUser = anonymousUser;
      }

      authUser.name = authUser.displayName;
      const { name, uid } = authUser;
      if (name && uid) {
        setUser({ name, uid });
        setLoading(false);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {loading ? <Loading text={"signing in"} /> : <>{children}</>}
    </AuthContext.Provider>
  );
}

export { auth };
