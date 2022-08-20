import React, { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import LoadingPage from "../components/LoadingPage";
import { firstSignIn } from "./api";
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

  // TODO: convert anonymous to permanent email and password account
  // https://firebase.google.com/docs/auth/web/anonymous-auth?authuser=0&hl=en

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      let authUser;
      if (user) {
        console.log("user is signed in");
        authUser = user;
      } else {
        try {
          console.log("new user detected, signing in anonymously");
          const userCredential = await signInAnonymously(auth);
          const anonymousUser = userCredential.user;
          const userDB = await firstSignIn(anonymousUser.uid);
          await updateProfile(anonymousUser, { displayName: userDB.name });
          authUser = anonymousUser;
        } catch (error) {
          console.log(error);
          window.location.reload();
        }
      }

      authUser.name = authUser.displayName;
      const { name, uid } = authUser;
      if (name && uid) {
        // TODO: sometimes this is called twice, thus creating double accounts.
        // Happens when user first sign in. Fix it.
        setUser({ name, uid });
        setLoading(false);
        socket.emit("setup", { name, uid });
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {loading ? <LoadingPage text={"Signing in..."} /> : <>{children}</>}
    </AuthContext.Provider>
  );
}

export { auth };
