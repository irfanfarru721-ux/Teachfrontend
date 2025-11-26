import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  return (
    <div style={{
      display: "flex", justifyContent: "space-between",
      alignItems: "center", padding: "10px 20px", borderBottom: "1px solid #eee",
      background: "#111827", color: "#fff"
    }}>
      <div style={{ fontWeight: "700" , cursor: "pointer"}} onClick={() => navigate("/admin/dashboard")}>
        Admin Panel
      </div>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <span>{user?.name || "Admin"}</span>
        <button onClick={() => { logout(); navigate("/admin/login"); }}
          style={{ background: "#ef4444", color: "#fff", border: "none", padding: "6px 10px", borderRadius: "6px" }}>
          Logout
        </button>
      </div>
    </div>
  );
}
