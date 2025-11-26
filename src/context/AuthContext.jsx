import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/apiClient.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check logged user
  useEffect(() => {
    async function loadUser() {
      try {
        const res = await api.get("/api/auth/me");
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/api/auth/login", { email, password });
    setUser(res.data.user);
    return res.data;
  };

  const logout = async () => {
    await api.post("/api/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
