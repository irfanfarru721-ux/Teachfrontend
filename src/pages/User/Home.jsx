import React, { useEffect, useState } from "react";
import { getProducts } from "../../api/api.js";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load products");
      setLoading(false);
    }
  };

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (error) return <h2 style={{ textAlign: "center", color: "red" }}>{error}</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>All Products</h1>

      {/* Product Grid */}
      <div
        style={{
          marginTop: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((p) => (
          <Link
            key={p._id}
            to={`/products/${p._id}`}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              textDecoration: "none",
              color: "#333",
              borderRadius: "8px",
              transition: "0.2s",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "140px",
                background: "#f5f5f5",
                borderRadius: "6px",
                marginBottom: "10px",
              }}
            >
              {/* If image exists show it */}
              {p.images && p.images.length > 0 ? (
                <img
                  src={p.images[0]}
                  alt={p.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#888",
                    fontSize: "14px",
                  }}
                >
                  No Image
                </div>
              )}
            </div>

            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
