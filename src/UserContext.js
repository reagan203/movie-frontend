// src/UserContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Holds user data
  const [token, setToken] = useState(null); // Holds the authentication token

  useEffect(() => {
    // Check for token in local storage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      const decodedToken = JSON.parse(atob(storedToken.split('.')[1])); // Decode JWT token
      setUser(decodedToken); // Set user state with the decoded token
    }
  }, []);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken); // Store the token in local storage
    const decodedToken = JSON.parse(atob(newToken.split('.')[1])); // Decode the token
    setUser(decodedToken); // Update the user state
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token'); // Remove the token from local storage
  };

  return (
    <UserContext.Provider value={{ user, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};
