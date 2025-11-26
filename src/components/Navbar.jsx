import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      {/* Logo / Brand */}
      <Link to="/" className="text-xl font-bold">
        MyStore
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <Link to="/" className="hover:underline">
              Dashboard
            </Link>
            <Link to="/orders" className="hover:underline">
              Orders
            </Link>
            <Link to="/cart" className="hover:underline">
              Cart
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login / Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
