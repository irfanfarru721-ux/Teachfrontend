import React, { useEffect, useState, useContext } from "react";
import { getProducts } from "../api/api.js";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate, useParams } from "react-router-dom";

export default function Products() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams(); // category ID
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return navigate("/login");

    const fetchProducts = async () => {
      try {
        const res = await getProducts(id);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user, id]);

  if (!user) return null;
  if (loading) return <p style={{ textAlign: "center" }}>Loading products...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {products.map((p) => (
          <div
            key={p._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              width: "200px",
              cursor: "pointer"
            }}
            onClick={() => navigate(`/product/${p._id}`)}
          >
            <h3>{p.name}</h3>
            <p>Price: ${p.price}</p>
            <p>Stock: {p.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
