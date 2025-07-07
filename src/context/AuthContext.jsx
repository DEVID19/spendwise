import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { createuserProfile } from "../utils/Expenses";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   let unsubscribe;

  //   const checkAuth = async () => {
  //     try {
  //       const result = await getRedirectResult(auth);
  //       if (result?.user) {
  //         await createuserProfile(result.user);
  //         setUser(result.user);
  //       }
  //     } catch (err) {
  //       console.error("Redirect sign-in error:", err);
  //     }

  //     unsubscribe = onAuthStateChanged(auth, async (user) => {
  //       console.log("onAuthStateChanged triggered. User is:", user);
  //       if (user) {
  //         setUser(user);
  //         await createuserProfile(user);
  //       } else {
  //         setUser(null);
  //       }
  //       setLoading(false);
  //     });
  //   };

  //   checkAuth();

  //   return () => {
  //     if (unsubscribe) unsubscribe();
  //   };
  // }, []);

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    console.log("onAuthStateChanged triggered. User is:", user);

    try {
      // First, handle redirect result (mainly for mobile sign-in)
      const result = await getRedirectResult(auth);
      if (result?.user) {
        await createuserProfile(result.user);
        setUser(result.user);
      } else if (user) {
        await createuserProfile(user);
        setUser(user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Redirect sign-in error:", err);
      setUser(null);
    }

    setLoading(false);
  });

  return () => unsubscribe();
}, []);


  const signup = async (email, password) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await createuserProfile(res.user);
    return res;
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    try {
      if (isMobile) {
        await signInWithRedirect(auth, provider);
      } else {
        const res = await signInWithPopup(auth, provider);
        await createuserProfile(res.user);
        return res;
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, signup, logout, login, googleSignIn, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
