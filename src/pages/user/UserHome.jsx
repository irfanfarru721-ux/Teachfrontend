import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient.js";

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
      {vendors.length === 0 ? <p>No vendors found.</p> :
        <ul>{vendors.map(v => <li key={v._id}>{v.name}</li>)}</ul>
      }
    </div>
  );
}
