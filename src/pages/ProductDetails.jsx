import React, { useEffect, useState, useContext } from "react";
import { getProduct } from "../api/api.js";
import { AuthContext } from "../context/AuthContext.jsx";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductDetails() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams(); // product ID
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return navigate("/login");

    const fetchProduct = async () => {
      try {
        const res = await getProduct(id);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [user, id]);

  if (!user) return null;
  if (loading) return <p style={{ textAlign: "center" }}>Loading product...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
      <p>Stock: {product.stock}</p>
      <button
        onClick={() => {
          let cart = JSON.parse(localStorage.getItem("cart") || "[]");
          cart.push({ ...product, quantity: 1 });
          localStorage.setItem("cart", JSON.stringify(cart));
          alert("Added to cart!");
        }}
        style={{ padding: "10px", marginTop: "10px" }}
      >
        Add to Cart
      </button>
    </div>
  );
}
