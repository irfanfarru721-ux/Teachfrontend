import { useState, useEffect } from "react";
import api from "../../api/apiClient.js";

export default function Vendors() {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    api.get("/api/vendors").then((res) => setVendors(res.data));
  }, []);

  return (
    <>
      <h1>All Vendors</h1>
      {vendors.map((v) => (
        <p key={v._id}>{v.name}</p>
      ))}
    </>
  );
}
