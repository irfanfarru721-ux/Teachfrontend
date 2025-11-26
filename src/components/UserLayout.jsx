import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";

export default function UserLayout({ children }) {
  return (
    <div className="user-layout">
      <Navbar />
      <div className="user-content">
        <aside className="user-sidebar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/vendors">Vendors</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </aside>
        <main className="user-main">{children}</main>
      </div>
    </div>
  );
}
