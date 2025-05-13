import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import MovieProvider from './context/movieProvider.jsx';
import UserProvider from './context/userProvider.jsx';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MovieProvider>
        <UserProvider>
        <App />
        </UserProvider>
      </MovieProvider>
    </BrowserRouter>
  </React.StrictMode>
)
