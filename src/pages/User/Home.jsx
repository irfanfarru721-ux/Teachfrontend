import React, { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://srudentbackend-1.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to the Store</h1>

      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <div style={styles.grid}>
          {products.map((p) => (
            <div key={p._id} style={styles.card}>
              <h3>{p.name}</h3>
              <p>₹{p.price}</p>
              <button style={styles.btn}>Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "20px",
  },
  card: {
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    textAlign: "center",
  },
  btn: {
    marginTop: "10px",
    padding: "8px 12px",
    background: "black",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
