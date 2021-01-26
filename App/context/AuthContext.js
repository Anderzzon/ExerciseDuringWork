import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
import {auth} from '../../firebaseConfig'

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      //console.log("user: ", user)
      setUser(user)
      setIsLoading(false)
    })

    return unsubscribe
  })

  const logIn = async (email, password) => {
    console.log('calling log in ');
    try {
      await auth.signInWithEmailAndPassword(email, password);
      console.log('logIn ');
      setIsLoggedIn(true);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      setIsLoggedIn(false);
    } catch (error) {
      console.log('error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoading, isLoggedIn, setIsLoggedIn, user, logIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}