import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { createOrder } from "../api/api.js";

export default function Checkout() {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const handleCheckout = async () => {
    if (!cart.length) return alert("Cart is empty");

    setLoading(true);
    try {
      const orderData = { items: cart, userId: user._id };
      await createOrder(orderData, { headers: { Authorization: `Bearer ${token}` } });
      localStorage.removeItem("cart");
      setMsg("Order placed successfully!");
      setCart([]);
      navigate("/orders");
    } catch (err) {
      console.error(err);
      setMsg("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item, idx) => (
            <div key={idx} style={{ borderBottom: "1px solid #ccc", paddingBottom: "10px", marginBottom: "10px" }}>
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
          <h3>Total: ${total}</h3>
          <button onClick={handleCheckout} disabled={loading} style={{ padding: "10px", marginTop: "10px" }}>
            {loading ? "Placing Order..." : "Place Order"}
          </button>
          {msg && <p style={{ color: "green", marginTop: "10px" }}>{msg}</p>}
        </div>
      )}
    </div>
  );
}
