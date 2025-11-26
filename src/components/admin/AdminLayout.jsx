import React from "react";
import AdminNavbar from "./AdminNavbar.jsx";
import AdminSidebar from "./AdminSidebar.jsx";

export default function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f9fafb" }}>
      <AdminSidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <AdminNavbar />
        <main style={{ padding: 20, flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
