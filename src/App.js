import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import HomePage from './pages/Home'; // Adjust the import path based on your folder structure
import LoginPage from './pages/LoginPage'; // Example for a login page component
import RegisterPage from './pages/RegisterPage'; // Example for a registration page component
import Navbar from './pages/Navbar'; // Navbar component for navigation
import MoviePage from './pages/Movie';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token'); // Remove token from local storage (if you use it)
  };

  return (
    <Router>
      <CssBaseline /> {/* Reset CSS styles */}
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} /> {/* Navbar with logout */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" /> : <LoginPage onLogin={handleLogin} />} 
        />
        <Route path="/register" element={<RegisterPage />} />
        {/* Add more routes as needed */}
        <Route path="/movie" element={<MoviePage />} /> {/* Movie page component */}
      </Routes>
    </Router>
  );
};

export default App;
