import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient.js";

export default function Vendors() {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    apiClient.get("/admin/vendors")
      .then(res => setVendors(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Vendors</h2>
      <ul>
        {vendors.map(v => (
          <li key={v._id}>
            {v.name} - {v.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
