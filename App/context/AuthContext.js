import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
import { auth } from '../../firebaseConfig';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((loggedInUser) => {
      setUser(loggedInUser);
      setIsLoading(false);
    });

    return unsubscribe;
  });

  //const logIn = async (email, password) => {
  const logIn = async () => {
    console.log('calling log in ');
    try {
      //await auth.signInWithEmailAndPassword(email, password);
      await auth.signInAnonymously();
      console.log('logIn ');
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log('error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoading, user, logIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
