import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function UserNavbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: "15px", background: "#eee", marginBottom: "20px" }}>
      <Link to="/" style={{ marginRight: "20px" }}>Home</Link>
      <Link to="/products" style={{ marginRight: "20px" }}>Products</Link>

      {user ? (
        <>
          <span style={{ marginRight: "20px" }}>Hello, {user.name}</span>
          <Link to="/cart" style={{ marginRight: "20px" }}>Cart</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: "20px" }}>Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
}
