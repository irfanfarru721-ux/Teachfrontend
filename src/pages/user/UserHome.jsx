import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient.js";
import { Link } from "react-router-dom";

export default function UserHome() {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    apiClient.get("/vendors")
      .then(res => setVendors(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Vendors</h2>
      <ul>
        {vendors.map(v => (
          <li key={v._id}>
            <Link to={`/categories/${v._id}`}>{v.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
