import React from "react";
import UserNavbar from "./UserNavbar.jsx";

export default function UserLayout({ children }) {
  return (
    <>
      <UserNavbar />
      <div style={{ padding: "20px" }}>{children}</div>
    </>
  );
}
