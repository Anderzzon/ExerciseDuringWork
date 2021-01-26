import React from 'react';

import Navigation from './App/navigation/navigation'
import AuthNavigation from './App/navigation/AuthNavigation';
import AuthContextProvider from './App/context/AuthContext';


export default function App() {
  
  return (
  <AuthContextProvider>
    <AuthNavigation/>
    </AuthContextProvider>
  );
}

