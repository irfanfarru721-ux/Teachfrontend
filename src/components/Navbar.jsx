import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: "10px", background: "#222", color: "#fff" }}>
      <Link to="/" style={{ color: "white", marginRight: "10px" }}>Home</Link>
      <Link to="/vendors" style={{ color: "white", marginRight: "10px" }}>Vendors</Link>
      <Link to="/cart" style={{ color: "white" }}>Cart</Link>

      <span style={{ float: "right" }}>
        {user ? (
          <>
            <span style={{ marginRight: 10 }}>{user.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/auth/login">Login</Link>
          </>
        )}
      </span>
    </nav>
  );
}
