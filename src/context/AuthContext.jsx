import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ role: "user" }); // default for testing

  const login = (email, password) => {
    // temporarily just set user
    setUser({ role: email === "admin@gmail.com" ? "admin" : "user" });
    localStorage.setItem("role", user.role);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
