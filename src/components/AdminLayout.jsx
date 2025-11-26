import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <Navbar />
      <div className="admin-content">
        <aside className="admin-sidebar">
          <ul>
            <li><Link to="/admin/dashboard">Dashboard</Link></li>
            <li><Link to="/admin/vendors">Vendors</Link></li>
            <li><Link to="/admin/products">Products</Link></li>
            <li><Link to="/admin/orders">Orders</Link></li>
          </ul>
        </aside>
        <main className="admin-main">{children}</main>
      </div>
    </div>
  );
}
