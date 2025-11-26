import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient.js";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    apiClient.get("/admin/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map(p => (
          <li key={p._id}>
            {p.name} - ₹{p.price} - Vendor: {p.vendor?.name || "N/A"}
          </li>
        ))}
      </ul>
    </div>
  );
}
