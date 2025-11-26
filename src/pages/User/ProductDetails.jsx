import React, { useEffect, useState } from "react";
import { getProduct } from "../../api/api";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [qty, setQty] = useState(1);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const res = await getProduct(id);
      setProduct(res.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (!product) return <h3>Product Not Found</h3>;

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const exists = cart.find((item) => item._id === product._id);

    if (exists) {
      exists.qty += qty;
    } else {
      cart.push({ ...product, qty });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>{product.name}</h1>

      <div style={{ marginTop: "10px" }}>
        <strong>Price: </strong>₹{product.price}
      </div>

      <div style={{ marginTop: "10px" }}>
        <label>Quantity: </label>
        <input
          type="number"
          min="1"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          style={{ width: "80px", marginLeft: "10px" }}
        />
      </div>

      <button
        onClick={addToCart}
        style={{ marginTop: "20px", padding: "10px 15px" }}
      >
        Add to Cart
      </button>
    </div>
  );
}
