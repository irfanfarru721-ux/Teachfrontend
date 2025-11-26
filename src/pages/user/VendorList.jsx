import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/apiClient.js";

export default function VendorList() {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    api.get("/api/vendors").then((res) => setVendors(res.data));
  }, []);

  return (
    <>
      <h1>Vendors</h1>
      {vendors.map((v) => (
        <p key={v._id}>
          <Link to={`/categories/${v._id}`}>{v.name}</Link>
        </p>
      ))}
    </>
  );
}
