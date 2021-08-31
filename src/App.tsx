import React from 'react';
import { Helmet } from 'react-helmet';
import './App.css';
import Application from './components/Application';
import UserProvider from './components/Authentication/UserProvider';

function App() {
  return (
    <>
    <Helmet
        titleTemplate="Bolsa de Trabajo"
        defaultTitle="Bolsa de Trabajo - IEPAM"
      />
    <UserProvider>
      <Application />
    </UserProvider>
    </>
  );
}

export default App;
