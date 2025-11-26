import { useState, useEffect } from "react";
import api from "../../api/apiClient.js";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/api/products").then((res) => setProducts(res.data));
  }, []);

  return (
    <>
      <h1>All Products</h1>
      {products.map((p) => (
        <p key={p._id}>{p.name}</p>
      ))}
    </>
  );
}
