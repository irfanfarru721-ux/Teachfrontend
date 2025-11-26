// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { setAuthToken } from "../api/api";

const AuthContext = createContext();

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load token from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      setUser({ token });
    }
  }, []);

  const login = (token) => {
    setAuthToken(token);
    localStorage.setItem("token", token);
    setUser({ token });
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming context
export const useAuth = () => useContext(AuthContext);
