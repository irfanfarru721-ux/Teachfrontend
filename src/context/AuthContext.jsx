import { createContext, useState, useEffect } from "react";
import { setAuthToken } from "../api/api.js";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      localStorage.setItem("token", token);
    } else {
      setAuthToken(null);
      localStorage.removeItem("token");
    }
  }, [token]);

  const logout = () => {
    setUser(null);
    setToken("");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
