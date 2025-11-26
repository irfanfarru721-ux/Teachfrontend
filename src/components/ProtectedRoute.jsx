import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  // When authentication is still loading
  if (loading) {
    return <p>Loading...</p>;
  }

  // If no user → redirect to login
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  // If role is required → check user role
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  // If all checks pass → give access
  return children;
}
