import React from 'react';
// Importing the Context Provider & Home Component
import MyContextProvider from './contexts/MyContext';
import Home from './components/Home'
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <MyContextProvider>
      <Home/>
    </MyContextProvider>
  );
}

export default App;