import React from "react";
import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  display: "block",
  padding: "10px 14px",
  color: isActive ? "#111827" : "#555",
  background: isActive ? "#f3f4f6" : "transparent",
  borderRadius: 6,
  textDecoration: "none"
});

export default function AdminSidebar() {
  return (
    <div style={{
      width: 220,
      padding: 16,
      borderRight: "1px solid #eee",
      height: "100vh",
      boxSizing: "border-box",
      background: "#fff"
    }}>
      <NavLink to="/admin/dashboard" style={linkStyle}>Dashboard</NavLink>
      <NavLink to="/admin/products" style={linkStyle}>Products</NavLink>
      <NavLink to="/admin/vendors" style={linkStyle}>Vendors</NavLink>
      <NavLink to="/admin/orders" style={linkStyle}>Orders</NavLink>
    </div>
  );
}
